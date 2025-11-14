import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/integration/supabase/client';
import type { Content, Page, Section } from '@/types/database';
// import type { PageDto, SectionDto, ContentDto } from '../types';

export interface PageData {
  page: Page | null;
  sections: Section[];
  content: Record<number, Content[]>;
}

interface UsePublicPageReturn {
  data: PageData;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface PageWithRelations extends PageData {
  sections: (Section & {
    content: Content[];
  })[];
}

export function usePublicPage(slug: string): UsePublicPageReturn {
  const [data, setData] = useState<PageData>({ page: null, sections: [], content: {} });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchPageBySlug = useCallback(async (slug: string): Promise<void> => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    
    setError(null);
    setLoading(true);

    try {
      const { data: pageData, error: fetchError } = await supabase
        .from('pages')
        .select(`
          *,
          sections:sections(
            *,
            content:content(*)
          )
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .eq('sections.is_active', true)
        .eq('sections.content.is_active', true)
        .order('sort_order', { referencedTable: 'sections', ascending: true })
        // .order('sort_order', { referencedTable: 'sections.content', ascending: true })
        .single();

      if (fetchError) throw fetchError;
      if (!pageData) throw new Error('Page not found');

      const typedPageData = pageData as unknown as PageWithRelations;
      const sections = typedPageData.sections || [];
      const contentMap: Record<number, Content[]> = {};

      sections.forEach(section => {
        contentMap[section.id] = section.content || [];
      });

      const cleanSections = sections.map(({ content, ...section }) => section);
      const dataObject = {
        page: typedPageData.page,
        sections: cleanSections,
        content: contentMap,
      }

      setData(dataObject);
      
      setLoading(false);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      
      const message = err instanceof Error ? err.message : 'Failed to fetch page';
      console.error('Error fetching page:', err);
      setError(message);
      setData({ page: null, sections: [], content: {} });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetchPageBySlug(slug);
    }
    
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [slug, fetchPageBySlug]);

  const refetch = useCallback(async (): Promise<void> => {
    if (slug) await fetchPageBySlug(slug);
  }, [slug, fetchPageBySlug]);

  return { data, loading, error, refetch };
}

export function useSectionContent(data: PageData, sectionId: number) {
  const [section, setSection] = useState<Section | null>(null);
  const [content, setContent] = useState<Content[] | null>(null);
  const [hasContent, setHasContent] = useState<boolean>(false);

  useEffect(() => {
    setSection(data.sections.find(s => s.id === sectionId) || null);
    setContent(data.content[sectionId] || null);
    setHasContent((data.content[sectionId]?.length || 0) > 0);
  }, [data, sectionId]);

  return {
    section,
    content,
    hasContent,
  };
}

export function useContentByKey(content: Content[], contentKey: string): Content | null {
  return content?.find(c => c.content_key === contentKey) ?? null;
}