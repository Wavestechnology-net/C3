import { useState, useCallback } from 'react';
import { 
  getPages as getPagesApi,
  getPageBySlug as getPageBySlugApi,
  getSectionsByPageId as getSectionsByPageIdApi,
  getContentBySectionId as getContentBySectionIdApi,
  createPage as createPageApi,
  updatePage as updatePageApi,
  deletePage as deletePageApi,
  createSection as createSectionApi,
  updateSection as updateSectionApi,
  updateSectionInfo as updateSectionInfoApi,
  deleteSection as deleteSectionApi,
} from '../services/pageService';
import type { PageType, SectionType, ContentType, ContentDto } from '../types';

interface LoadingState {
  pages: boolean;
  sections: boolean;
  content: boolean;
  mutation: boolean;
}

interface UsePageReturn {
  // Query methods
  getPages: () => Promise<PageType[]>;
  getPageBySlug: (slug: string) => Promise<PageType | null>;
  getSectionsByPageId: (pageId: number) => Promise<SectionType[]>;
  getContentBySectionId: (sectionId: number) => Promise<ContentType[]>;
  
  // Mutation methods
  createPage: (pageData: Omit<PageType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<PageType>;
  updatePage: (id: number, pageData: Partial<PageType>) => Promise<PageType>;
  deletePage: (id: number) => Promise<void>;
  createSection: (sectionData: Omit<SectionType, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SectionType>;
  updateSection: (sectionId: number, contentBlocks: ContentDto[]) => Promise<void>;
  updateSectionInfo: (id: number, sectionData: Partial<SectionType>) => Promise<SectionType>;
  deleteSection: (id: number) => Promise<void>;
  
  // State
  pages: PageType[] | null;
  sections: SectionType[] | null;
  content: ContentType[] | null;
  loading: LoadingState;
  error: string | null;
  
  // Cache management
  clearCache: () => void;
  invalidatePages: () => void;
  invalidateSections: () => void;
  invalidateContent: () => void;
}

export const usePage = (): UsePageReturn => {
  const [pages, setPages] = useState<PageType[] | null>(null);
  const [sections, setSections] = useState<SectionType[] | null>(null);
  const [content, setContent] = useState<ContentType[] | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    pages: false,
    sections: false,
    content: false,
    mutation: false,
  });
  const [error, setError] = useState<string | null>(null);

  // Helper to update specific loading state
  const setSpecificLoading = useCallback((key: keyof LoadingState, value: boolean) => {
    setLoading(prev => ({ ...prev, [key]: value }));
  }, []);

  // Cache management
  const clearCache = useCallback(() => {
    setPages(null);
    setSections(null);
    setContent(null);
    setError(null);
  }, []);

  const invalidatePages = useCallback(() => {
    setPages(null);
  }, []);

  const invalidateSections = useCallback(() => {
    setSections(null);
  }, []);

  const invalidateContent = useCallback(() => {
    setContent(null);
  }, []);

  // Query methods
  const getPages = useCallback(async (): Promise<PageType[]> => {
    // Return cached data if available
    if (pages) return pages;

    setSpecificLoading('pages', true);
    setError(null);
    
    try {
      const result = await getPagesApi();
      setPages(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get pages';
      setError(message);
      throw err;
    } finally {
      setSpecificLoading('pages', false);
    }
  }, [pages, setSpecificLoading]);

  const getPageBySlug = useCallback(async (slug: string): Promise<PageType | null> => {
    // Check cache first
    if (pages) {
      const cached = pages.find(p => p.slug === slug);
      if (cached) return cached;
    }

    setSpecificLoading('pages', true);
    setError(null);
    
    try {
      const result = await getPageBySlugApi(slug);
      
      // Update cache if we have pages loaded
      if (result && pages) {
        setPages(prev => {
          if (!prev) return [result];
          const exists = prev.some(p => p.id === result.id);
          return exists ? prev : [...prev, result];
        });
      }
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get page';
      setError(message);
      throw err;
    } finally {
      setSpecificLoading('pages', false);
    }
  }, [pages, setSpecificLoading]);

  const getSectionsByPageId = useCallback(async (pageId: number): Promise<SectionType[]> => {
    setSpecificLoading('sections', true);
    setError(null);
    
    try {
      const result = await getSectionsByPageIdApi(pageId);
      setSections(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get sections';
      setError(message);
      throw err;
    } finally {
      setSpecificLoading('sections', false);
    }
  }, [setSpecificLoading]);

  const getContentBySectionId = useCallback(async (sectionId: number): Promise<ContentType[]> => {
    setSpecificLoading('content', true);
    setError(null);
    
    try {
      const result = await getContentBySectionIdApi(sectionId);
      setContent(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get content';
      setError(message);
      throw err;
    } finally {
      setSpecificLoading('content', false);
    }
  }, [setSpecificLoading]);

  // Mutation methods
  const createPage = useCallback(async (
    pageData: Omit<PageType, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<PageType> => {
    setSpecificLoading('mutation', true);
    setError(null);
    
    try {
      const result = await createPageApi(pageData);
      
      // Optimistic update
      setPages(prev => prev ? [...prev, result] : [result]);
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create page';
      setError(message);
      
      // Revert optimistic update on error
      invalidatePages();
      throw err;
    } finally {
      setSpecificLoading('mutation', false);
    }
  }, [invalidatePages, setSpecificLoading]);

  const updatePage = useCallback(async (
    id: number, 
    pageData: Partial<PageType>
  ): Promise<PageType> => {
    setSpecificLoading('mutation', true);
    setError(null);
    
    // Store previous state for rollback
    const previousPages = pages;
    
    // Optimistic update
    setPages(prev => prev?.map(p => p.id === id ? { ...p, ...pageData } as PageType : p) || null);
    
    try {
      const result = await updatePageApi(id, pageData);
      
      // Update with actual result
      setPages(prev => prev?.map(p => p.id === id ? result : p) || null);
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update page';
      setError(message);
      
      // Rollback on error
      setPages(previousPages);
      throw err;
    } finally {
      setSpecificLoading('mutation', false);
    }
  }, [pages, setSpecificLoading]);

  const deletePage = useCallback(async (id: number): Promise<void> => {
    setSpecificLoading('mutation', true);
    setError(null);
    
    // Store previous state for rollback
    const previousPages = pages;
    
    // Optimistic update
    setPages(prev => prev?.filter(p => p.id !== id) || null);
    
    try {
      await deletePageApi(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete page';
      setError(message);
      
      // Rollback on error
      setPages(previousPages);
      throw err;
    } finally {
      setSpecificLoading('mutation', false);
    }
  }, [pages, setSpecificLoading]);

  const createSection = useCallback(async (
    sectionData: Omit<SectionType, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<SectionType> => {
    setSpecificLoading('mutation', true);
    setError(null);
    
    try {
      const result = await createSectionApi(sectionData);
      
      // Optimistic update
      setSections(prev => prev ? [...prev, result] : [result]);
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create section';
      setError(message);
      
      // Revert optimistic update on error
      invalidateSections();
      throw err;
    } finally {
      setSpecificLoading('mutation', false);
    }
  }, [invalidateSections, setSpecificLoading]);

  const updateSection = useCallback(async (
    sectionId: number, 
    contentBlocks: ContentDto[]
  ): Promise<void> => {
    setSpecificLoading('mutation', true);
    setError(null);
    
    try {
      await updateSectionApi(sectionId, contentBlocks);
      
      // Invalidate content cache as it might have changed
      invalidateContent();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update section';
      setError(message);
      throw err;
    } finally {
      setSpecificLoading('mutation', false);
    }
  }, [invalidateContent, setSpecificLoading]);

  const updateSectionInfo = useCallback(async (
    id: number, 
    sectionData: Partial<SectionType>
  ): Promise<SectionType> => {
    setSpecificLoading('mutation', true);
    setError(null);
    
    // Store previous state for rollback
    const previousSections = sections;
    
    // Optimistic update
    setSections(prev => prev?.map(s => s.id === id ? { ...s, ...sectionData } as SectionType : s) || null);
    
    try {
      const result = await updateSectionInfoApi(id, sectionData);
      
      // Update with actual result
      setSections(prev => prev?.map(s => s.id === id ? result : s) || null);
      
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update section info';
      setError(message);
      
      // Rollback on error
      setSections(previousSections);
      throw err;
    } finally {
      setSpecificLoading('mutation', false);
    }
  }, [sections, setSpecificLoading]);

  const deleteSection = useCallback(async (id: number): Promise<void> => {
    setSpecificLoading('mutation', true);
    setError(null);
    
    // Store previous state for rollback
    const previousSections = sections;
    
    // Optimistic update
    setSections(prev => prev?.filter(s => s.id !== id) || null);
    
    try {
      await deleteSectionApi(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete section';
      setError(message);
      
      // Rollback on error
      setSections(previousSections);
      throw err;
    } finally {
      setSpecificLoading('mutation', false);
    }
  }, [sections, setSpecificLoading]);

  return {
    // Query methods
    getPages,
    getPageBySlug,
    getSectionsByPageId,
    getContentBySectionId,
    
    // Mutation methods
    createPage,
    updatePage,
    deletePage,
    createSection,
    updateSection,
    updateSectionInfo,
    deleteSection,
    
    // State
    pages,
    sections,
    content,
    loading,
    error,
    
    // Cache management
    clearCache,
    invalidatePages,
    invalidateSections,
    invalidateContent,
  };
};