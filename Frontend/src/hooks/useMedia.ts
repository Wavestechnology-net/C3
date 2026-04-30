import { useMemo } from 'react';
import { useGetAllMediaQuery } from '../services/apis/mediaApi';
import type { MediaDto } from '../types';

interface UseMediaReturn {
  mediaUrls: Record<number, string>;
  isLoading: boolean;
  isError: boolean;
  getMediaUrl: (mediaId: number) => string | null;
  getMedia: (mediaId: number) => MediaDto | null;
  preloadAllMedia: () => void;
}

export const useMedia = (): UseMediaReturn => {
  const {
    data: mediaData,
    isLoading,
    isError,
    refetch
  } = useGetAllMediaQuery();

  // Create media URL lookup map
  const mediaUrls = useMemo(() => {
    if (!mediaData?.data) return {};

    return mediaData.data.reduce((acc, media) => {
      acc[media.id] = media.mediaUrl;
      return acc;
    }, {} as Record<number, string>);
  }, [mediaData]);

  const media = useMemo(() => {
    if (!mediaData?.data) return {};

    return mediaData.data.reduce((acc, media) => {
      acc[media.id] = {
        ...media,
        mediaUrl: import.meta.env.VITE_BASE_API_URL + media.mediaUrl
      };
      return acc;
    }, {} as Record<number, MediaDto>);
  }, [mediaData]);

  // Get media URL by ID
  const getMediaUrl = (mediaId: number): string | null => {
    if (mediaUrls[mediaId]) {
      return import.meta.env.VITE_BASE_API_URL + mediaUrls[mediaId];
    }

    return null;
  };

  function getMedia(mediaId: number): MediaDto | null {
    if (media[mediaId]) {
      return media[mediaId];
    }

    return null;
  }

  // Preload all media (useful for warming up the cache)
  const preloadAllMedia = () => {
    if (!mediaData && !isLoading) {
      refetch();
    }
  };

  return {
    mediaUrls,
    isLoading,
    isError,
    getMediaUrl,
    getMedia,
    preloadAllMedia
  };
};