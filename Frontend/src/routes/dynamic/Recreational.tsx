import { useCallback } from "react";
import HeroSection from "../../components/sections/HeroSection";
import CarouselSection from "../../components/sections/CarouselSection";
import ContentImageSection from "../../components/sections/ContentImageSection";
import PartnerCarouselSection from "../../components/sections/PartnerCarouselSection";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";
import ContentSection from "../../components/sections/ContentSection";
import WhyJoinSection from "../../components/sections/WhyJoinSection";
import type { Section } from "@/types/database";
import { usePublicPage } from "@/hooks/usePublicPage";
import { useMedia } from "@/hooks/useMedia";

export default function Recreational(){
  const { data: pageData, loading: pageDataLoading, error } = usePublicPage('recreational');
  const {loading: imagesLoading} = useMedia()

  const loading = pageDataLoading || imagesLoading;
    
  const renderSection = useCallback((section: Section) => {
    const baseProps = {
      sectionId: section.id,
      pageData: pageData
    };
    const isWhyJoinSection = section.name?.toLowerCase().includes('why') || 
                      section.name?.toLowerCase().includes('join');

    
    switch (section.section_type) {
      case 'hero':
        return <HeroSection key={section.id} {...baseProps} />;
      case 'carousel':
        return <CarouselSection key={section.id} {...baseProps} />;
      case 'content-image':
        if(isWhyJoinSection){
          return <WhyJoinSection key={section.id} section={section} {...baseProps} />;
        }
        return <ContentImageSection key={section.id} {...baseProps} />;
      case 'image-content':
        return <ContentImageSection key={section.id} {...baseProps} reverse={true} />;
      case 'partner-carousel':
        return <PartnerCarouselSection key={section.id} {...baseProps} />;
      default:
        return <ContentSection key={section.id} section={section} {...baseProps} />;
    }
  }, [pageData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error && !pageData) {
    return <PageDataErrorFallback />
  }

  return (
    <div className="font-sans text-[#1d2033]">
      {pageData.sections.map(renderSection)}

      <section className="bg-white py-30">
        <h2 className="text-4xl font-bold text-center text-black uppercase">
          RISE with C3FC SOCCER Club
        </h2>
      </section>
    </div>
  );
};