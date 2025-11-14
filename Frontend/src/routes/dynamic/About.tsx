import { useCallback } from "react";
import HeroSection from "../../components/sections/HeroSection";
import ContentSection from "../../components/sections/ContentSection";
import ContentImageSection from "../../components/sections/ContentImageSection";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";
import MissionSection from "../../components/sections/MissionSection";
import { usePublicPage } from "@/hooks/usePublicPage";
import { useMedia } from "@/hooks/useMedia";
import type { Section } from "@/types/database";

export default function About(){
  const { data: pageData, loading: pageDataLoading, error } = usePublicPage('about');
  const {loading: imagesLoading} = useMedia()
  
  const renderSection = useCallback((section: Section) => {
    const baseProps = {
      sectionId: section.id,
      pageData: pageData
    };
    const isMissionSection = section.name?.toLowerCase().includes('mission');

    switch (section.section_type) {
      case 'hero':
        return <HeroSection key={section.id} {...baseProps} />;
      case 'content':
        return <ContentSection key={section.id} section={section} {...baseProps} />;
      case 'content-image':
        if(isMissionSection){
          return <MissionSection key={section.id} section={section} {...baseProps} />
        }
        return <ContentImageSection key={section.id} {...baseProps} />;
      case 'image-content':
        return <ContentImageSection key={section.id} {...baseProps} reverse={true} />;
    //   case 'cta':
    //     return <CtaSection key={section.id} {...baseProps} />;
      default:
        return <ContentSection key={section.id} section={section} {...baseProps} />;
    }
  }, [pageData]);

  if (pageDataLoading || imagesLoading) {
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
        <h2 className="text-4xl font-bold text-center text-black uppercase font-serif">
          RISE WITH US
        </h2>
      </section>
    </div>
  );
};