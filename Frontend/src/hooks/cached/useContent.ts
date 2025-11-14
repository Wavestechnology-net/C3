import { useState, useEffect, useCallback } from 'react';
import { cachedContentService } from '@/services/cached/content.service';
import type { Content } from '@/types/database';

export function useContent(sectionId?: number, activeOnly: boolean = false) {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      const data = sectionId 
        ? await cachedContentService.getBySectionId(sectionId, activeOnly)
        : await cachedContentService.getAll(activeOnly);
      setContent(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [sectionId, activeOnly]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, error, refetch: fetchContent };
}

export function useContentItem(id: number | null) {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContent = useCallback(async () => {
    if (!id) {
      setContent(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cachedContentService.getById(id);
      setContent(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, error, refetch: fetchContent };
}

export function useContentByKey(sectionId: number | null, contentKey: string | null, locale?: string) {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContent = useCallback(async () => {
    if (!sectionId || !contentKey) {
      setContent(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cachedContentService.getByKey(sectionId, contentKey, locale);
      setContent(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [sectionId, contentKey, locale]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { content, loading, error, refetch: fetchContent };
}

export function useContentMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createContent = async (content: Omit<Content, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>) => {
    try {
      setLoading(true);
      const data = await cachedContentService.create(content);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: number, content: Partial<Omit<Content, 'id' | 'created_at' | 'created_by'>>) => {
    try {
      setLoading(true);
      const data = await cachedContentService.update(id, content);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: number) => {
    try {
      setLoading(true);
      await cachedContentService.delete(id);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: number, isActive: boolean) => {
    try {
      setLoading(true);
      const data = await cachedContentService.toggleActive(id, isActive);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createContent, updateContent, deleteContent, toggleActive, loading, error };
}