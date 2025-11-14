import { useState, useEffect, useCallback } from 'react';
import { cachedContentMediaService } from '@/services/cached/content-media.service';

export function useContentMedia(contentId: number | null, activeOnly: boolean = false) {
  const [contentMedia, setContentMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContentMedia = useCallback(async () => {
    if (!contentId) {
      setContentMedia([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cachedContentMediaService.getByContentId(contentId, activeOnly);
      setContentMedia(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [contentId, activeOnly]);

  useEffect(() => {
    fetchContentMedia();
  }, [fetchContentMedia]);

  return { contentMedia, loading, error, refetch: fetchContentMedia };
}

export function useContentMediaItem(id: number | null) {
  const [contentMedia, setContentMedia] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContentMedia = useCallback(async () => {
    if (!id) {
      setContentMedia(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cachedContentMediaService.getById(id);
      setContentMedia(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchContentMedia();
  }, [fetchContentMedia]);

  return { contentMedia, loading, error, refetch: fetchContentMedia };
}

export function useContentMediaMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const attachMedia = async (contentId: number, mediaId: number, sortOrder?: number) => {
    try {
      setLoading(true);
      const data = await cachedContentMediaService.attachMedia(contentId, mediaId, sortOrder);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const detachMedia = async (contentId: number, mediaId: number) => {
    try {
      setLoading(true);
      await cachedContentMediaService.detachMedia(contentId, mediaId);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteContentMedia = async (id: number) => {
    try {
      setLoading(true);
      await cachedContentMediaService.delete(id);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateContentMedia = async (id: number, data: any) => {
    try {
      setLoading(true);
      const result = await cachedContentMediaService.update(id, data);
      setError(null);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reorderContentMedia = async (items: { id: number; sort_order: number }[]) => {
    try {
      setLoading(true);
      await cachedContentMediaService.reorder(items);
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
      const data = await cachedContentMediaService.toggleActive(id, isActive);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    attachMedia, 
    detachMedia, 
    deleteContentMedia, 
    updateContentMedia,
    reorderContentMedia,
    toggleActive,
    loading, 
    error 
  };
}