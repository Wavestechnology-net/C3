import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  getAllMedia as getAllMediaApi,
  getMediaById as getMediaByIdApi,
  uploadMedia as uploadMediaApi,
  deleteMedia as deleteMediaApi,
  updateMedia as updateMediaApi,
  type MediaUploadDto
} from '../services/mediaService';
import type { MediaDto } from '../types';

interface UseMediaReturn {
  getAllMedia: () => Promise<MediaDto[]>;
  getMediaById: (id: number) => Promise<MediaDto | null>;
  uploadMedia: (mediaData: MediaUploadDto) => Promise<MediaDto>;
  deleteMedia: (id: number) => Promise<void>;
  updateMedia: (id: number, altText: string) => Promise<MediaDto>;
  getMediaUrl: (id: number) => string | undefined;
  getMedia: (id: number) => MediaDto | undefined;
  refreshMedia: () => Promise<void>;
  media: MediaDto[] | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useMedia = (): UseMediaReturn => {
  const [media, setMedia] = useState<MediaDto[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);
  const hasLoadedRef = useRef(false);

  // Track component mount state to prevent state updates after unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Memoized function to fetch all media
  const fetchAllMedia = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await getAllMediaApi();
      if (isMountedRef.current) {
        setMedia(result);
        hasLoadedRef.current = true;
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err.message || 'Failed to load media');
        console.error('Error fetching media:', err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Load media on initial mount only
  useEffect(() => {
    if (!hasLoadedRef.current) {
      fetchAllMedia();
    }
  }, [fetchAllMedia]);

  const getAllMedia = useCallback(async (): Promise<MediaDto[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getAllMediaApi();
      if (isMountedRef.current) {
        setMedia(result);
      }
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to get all media';
      if (isMountedRef.current) {
        setError(errorMessage);
      }
      throw new Error(errorMessage);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const getMediaById = useCallback(async (id: number): Promise<MediaDto | null> => {
    // Return from cache if available
    if (media) {
      const cached = media.find(m => m.id === id);
      if (cached) return cached;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await getMediaByIdApi(id);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || `Failed to get media with ID ${id}`;
      if (isMountedRef.current) {
        setError(errorMessage);
      }
      throw new Error(errorMessage);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [media]);

  const getMediaUrl = useCallback((id: number): string | undefined => {
    if (!media) return undefined;
    
    const mediaItem = media.find(m => m.id === id);
    console.log(mediaItem);
    
    if (!mediaItem?.mediaUrl) return undefined;
    
    // Return absolute URLs as-is
    if (mediaItem.mediaUrl.startsWith('http://') || mediaItem.mediaUrl.startsWith('https://')) {
      return mediaItem.mediaUrl;
    }
    
    // Prepend base URL for relative paths
    const baseUrl = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET_URL || '';
    return `${baseUrl}${mediaItem.mediaUrl}`;
  }, [media]);

  const getMedia = useCallback((id: number): MediaDto | undefined => {
    return media?.find(m => m.id === id);
  }, [media]);

  const uploadMedia = useCallback(async (mediaData: MediaUploadDto): Promise<MediaDto> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await uploadMediaApi(mediaData);
      if (isMountedRef.current) {
        setMedia(prev => prev ? [...prev, result] : [result]);
      }
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to upload media';
      if (isMountedRef.current) {
        setError(errorMessage);
      }
      throw new Error(errorMessage);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const deleteMedia = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteMediaApi(id);
      if (isMountedRef.current) {
        setMedia(prev => prev?.filter(m => m.id !== id) || null);
      }
    } catch (err: any) {
      const errorMessage = err.message || `Failed to delete media with ID ${id}`;
      if (isMountedRef.current) {
        setError(errorMessage);
      }
      throw new Error(errorMessage);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const updateMedia = useCallback(async (id: number, altText: string): Promise<MediaDto> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await updateMediaApi(id, altText);
      if (isMountedRef.current) {
        setMedia(prev => prev?.map(m => m.id === id ? result : m) || null);
      }
      return result;
    } catch (err: any) {
      const errorMessage = err.message || `Failed to update media with ID ${id}`;
      if (isMountedRef.current) {
        setError(errorMessage);
      }
      throw new Error(errorMessage);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const refreshMedia = useCallback(async (): Promise<void> => {
    await fetchAllMedia();
  }, [fetchAllMedia]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    getAllMedia,
    getMediaById,
    uploadMedia,
    deleteMedia,
    updateMedia,
    getMediaUrl,
    getMedia,
    refreshMedia,
    media,
    loading,
    error,
    clearError,
  };
};