import { useState, useEffect, useMemo, useCallback } from 'react';
import * as mediaService from '../services/mediaService';
import type { MediaDto } from '../types';

interface UseMediaReturn {
  media: MediaDto[];
  isLoading: boolean;
  isError: boolean;
  getMediaUrl: (mediaId: number) => string | null;
  getMedia: (mediaId: number) => MediaDto | null;
  refetch: () => void;
}

export const useMedia = (): UseMediaReturn => {
  const [media, setMedia] = useState<MediaDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const mediaList = await mediaService.getAllMedia();
      setMedia(mediaList);
    } catch (error) {
      setIsError(true);
      console.error("Failed to fetch media:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const mediaMap = useMemo(() => {
    if (!media) return new Map<number, MediaDto>();
    return new Map(media.map(m => [Number(m.id), m]));
  }, [media]);

  const getMediaUrl = useCallback((mediaId: number): string | null => {
    const mediaItem = mediaMap.get(mediaId);
    return mediaItem?.mediaUrl || null;
  }, [mediaMap]);

  const getMedia = useCallback((mediaId: number): MediaDto | null => {
    return mediaMap.get(mediaId) || null;
  }, [mediaMap]);

  return {
    media,
    isLoading,
    isError,
    getMediaUrl,
    getMedia,
    refetch: fetchMedia,
  };
};