import { useMemo } from "react";
import { useGetPageBySlugQuery } from "../../services/apis/publicApi";
import HeroSection from "../../components/sections/HeroSection";
import CarouselSection from "../../components/sections/CarouselSection";
import ContentImageSection from "../../components/sections/ContentImageSection";
import PartnerCarouselSection from "../../components/sections/PartnerCarouselSection";
// import { useGetAllMediaQuery } from "../../services/apis/mediaApi";
// import PageNotFound from "../PageNotFound";
import type { SectionDto } from "../../types";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";

export default function Home() {
  const {
    data: pageData,
    isLoading,
    isError
    // isLoading: pageLoading, 
    // isError: isPageError, 
    // error 
  } = useGetPageBySlugQuery('home', {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  // const { 
  //    data: mediaData, 
  // isLoading: mediaLoading, 
  // isError: isMediaError 
  // } = useGetAllMediaQuery();

  // Create media URL lookup map
  // const mediaUrls = useMemo(() => {
  //   if (!mediaData?.data) return {};
  //   return mediaData.data.reduce((acc, media: MediaDto) => {
  //     acc[media.id] = import.meta.env.VITE_STATIC_FILE_SERVER + media.mediaUrl;
  //     return acc;
  //   }, {} as Record<number, string>);
  // }, [mediaData]);

  // Memoize sorted sections for performance
  const sortedSections = useMemo(() => {
    if (!pageData?.sections) return [];
    return [...pageData.sections].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [pageData?.sections]);

  // Combined loading state
  // const isLoading = pageLoading || mediaLoading;
  // const isError = isPageError || isMediaError;


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError && !pageData) {
    return <PageDataErrorFallback />
  }

  const renderSection = (section: SectionDto) => {
    switch (section.sectionType) {
      case 'hero':
        return <HeroSection key={section.id} section={section} />;
      case 'carousel':
        return <CarouselSection key={section.id} section={section} />;
      case 'content-image':
        return <ContentImageSection key={section.id} section={section} />;
      case 'image-content':
        return <ContentImageSection key={section.id} section={section} reverse={true} />;
      case 'partner-carousel':
        return <PartnerCarouselSection key={section.id} section={section} />;
      default:
        return <ContentImageSection key={section.id} section={section} />;
    }
  };

  return (
    <div className="font-sans text-[#1d2033]">
      {sortedSections.map(renderSection)}
    </div>
  );
};