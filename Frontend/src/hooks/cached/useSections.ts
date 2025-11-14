import { useState, useEffect, useCallback } from 'react';
import { cachedSectionsService } from '@/services/cached/sections.service';
import type { Section } from '@/types/database';

export function useSections(pageId?: number, activeOnly: boolean = false) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSections = useCallback(async () => {
    try {
      setLoading(true);
      const data = pageId 
        ? await cachedSectionsService.getByPageId(pageId, activeOnly)
        : await cachedSectionsService.getAll(activeOnly);
      setSections(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [pageId, activeOnly]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  return { sections, loading, error, refetch: fetchSections };
}

export function useSection(id: number | null) {
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSection = useCallback(async () => {
    if (!id) {
      setSection(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cachedSectionsService.getById(id);
      setSection(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSection();
  }, [fetchSection]);

  return { section, loading, error, refetch: fetchSection };
}

export function useSectionMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createSection = async (section: Omit<Section, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>) => {
    try {
      setLoading(true);
      const data = await cachedSectionsService.create(section);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (id: number, section: Partial<Omit<Section, 'id' | 'created_at' | 'created_by'>>) => {
    try {
      setLoading(true);
      const data = await cachedSectionsService.update(id, section);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteSection = async (id: number) => {
    try {
      setLoading(true);
      await cachedSectionsService.delete(id);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reorderSections = async (sections: { id: number; sort_order: number }[]) => {
    try {
      setLoading(true);
      await cachedSectionsService.reorder(sections);
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
      const data = await cachedSectionsService.toggleActive(id, isActive);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSection, updateSection, deleteSection, reorderSections, toggleActive, loading, error };
}