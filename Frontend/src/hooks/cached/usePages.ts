import { useState, useEffect, useCallback } from 'react';
import { cachedPagesService } from '@/services/cached/pages.service';
import type { Page } from '@/types/database';

export function usePages(activeOnly: boolean = false) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cachedPagesService.getAll(activeOnly);
      setPages(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  return { pages, loading, error, refetch: fetchPages };
}

export function usePage(id: number | null) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPage = useCallback(async () => {
    if (!id) {
      setPage(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cachedPagesService.getById(id);
      setPage(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  return { page, loading, error, refetch: fetchPage };
}

export function usePageBySlug(slug: string | null) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPage = useCallback(async () => {
    if (!slug) {
      setPage(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cachedPagesService.getBySlug(slug);
      setPage(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  return { page, loading, error, refetch: fetchPage };
}

export function usePageMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createPage = async (page: Omit<Page, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>) => {
    try {
      setLoading(true);
      const data = await cachedPagesService.create(page);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (id: number, page: Partial<Omit<Page, 'id' | 'created_at' | 'created_by'>>) => {
    try {
      setLoading(true);
      const data = await cachedPagesService.update(id, page);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: number) => {
    try {
      setLoading(true);
      await cachedPagesService.delete(id);
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
      const data = await cachedPagesService.toggleActive(id, isActive);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPage, updatePage, deletePage, toggleActive, loading, error };
}