import { useState, useEffect, useCallback } from 'react';
import { cachedMediaService } from '@/services/cached/media.service';
import type { Media } from '@/types/database';

export function useMedia(activeOnly: boolean = false) {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cachedMediaService.getAll(activeOnly);
      setMedia(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [activeOnly]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { media, loading, error, refetch: fetchMedia };
}

export function useMediaItem(id: number | null) {
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMedia = useCallback(async () => {
    if (!id) {
      setMedia(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await cachedMediaService.getById(id);
      setMedia(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { media, loading, error, refetch: fetchMedia };
}

export function useMediaMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMedia = async (file: File, bucket?: string) => {
    try {
      setLoading(true);
      setUploadProgress(0);
      const data = await cachedMediaService.upload(file, bucket);
      setUploadProgress(100);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const updateMedia = async (id: number, media: Partial<Omit<Media, 'id' | 'created_at' | 'created_by'>>) => {
    try {
      setLoading(true);
      const data = await cachedMediaService.update(id, media);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id: number, deleteFile: boolean = false) => {
    try {
      setLoading(true);
      
      if (deleteFile) {
        const mediaItem = await cachedMediaService.getById(id);
        await cachedMediaService.deleteFile(mediaItem.media_url);
      }
      
      await cachedMediaService.delete(id);
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
      const data = await cachedMediaService.toggleActive(id, isActive);
      setError(null);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadMedia, updateMedia, deleteMedia, toggleActive, loading, error, uploadProgress };
}