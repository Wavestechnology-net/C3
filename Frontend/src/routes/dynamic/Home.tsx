import { useCallback } from "react";
import HeroSection from "../../components/sections/HeroSection";
import CarouselSection from "../../components/sections/CarouselSection";
import ContentImageSection from "../../components/sections/ContentImageSection";
import PartnerCarouselSection from "../../components/sections/PartnerCarouselSection";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";
import { usePublicPage } from "@/hooks/usePublicPage";
import type { Section } from "@/types/database";
import { useMedia } from "@/hooks/cached/useMedia";

export default function Home() {
  const { data: pageData, loading: pageDataLoading, error } = usePublicPage('home');
  const {loading: imagesLoading} = useMedia()
  // Memoize sorted sections
  // const sortedSections = useMemo(() => {
  //   console.log("Sorted sections memoized...");
    
  //   if (!pageData?.sections) return [];
  //   return [...pageData.sections].sort((a, b) => 
  //     (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  //   );
  // }, []);

  // Memoize section renderer
  const renderSection = useCallback((section: Section) => {
    const baseProps = {
      sectionId: section.id,
      pageData: pageData
    };

    switch (section.section_type) {
      case 'hero':
        return <HeroSection key={section.id} {...baseProps} />;
      
      case 'carousel':
        return <CarouselSection key={section.id} {...baseProps} />;
      
      case 'content-image':
        return <ContentImageSection key={section.id} {...baseProps} />;
      
      case 'image-content':
        return <ContentImageSection key={section.id} reverse={true} {...baseProps} />;
      
      case 'partner-carousel':
        return <PartnerCarouselSection key={section.id} {...baseProps} />;
      
      default:
        console.warn(`Unknown section type: ${section.section_type}`);
        return <ContentImageSection key={section.id} {...baseProps} />;
    }
  }, [pageData]);

  // Show loading state while fetching critical data
  if (pageDataLoading || imagesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" 
             role="status" 
             aria-label="Loading page content">
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return <PageDataErrorFallback />;
  }

  return (
    <>
      {/* SEO Metadata */}
      {/* {pageData.page.title && (
        <title>{pageData.page.title}</title>
      )}
      {pageData.page.metaDescription && (
        <meta name="description" content={pageData.page.metaDescription} />
      )} */}

      {/* Page Content */}
      <div className="font-sans text-[#1d2033]">
        {pageDataLoading || imagesLoading && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-white shadow-lg rounded-lg px-4 py-2 flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Loading content...</span>
            </div>
          </div>
        )}
        
        {pageData.sections.map(renderSection)}
      </div>
    </>
  );
}