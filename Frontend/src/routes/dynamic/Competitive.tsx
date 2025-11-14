import { useMedia } from "../../hooks/useMedia";
import HeroSection from "../../components/sections/HeroSection";
import ContentSection from "../../components/sections/ContentSection";
import ContentImageSection from "../../components/sections/ContentImageSection";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";
import WhyJoinSection from "../../components/sections/WhyJoinSection";
import type { Section } from "@/types/database";
import { usePublicPage } from "@/hooks/usePublicPage";
import { useCallback } from "react";

export default function Competitive(){
  const { data: pageData, loading: pageDataLoading, error } = usePublicPage('competitive');
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
        return <HeroSection key={section.id} {...baseProps}/>;
      case 'content':
        return <ContentSection key={section.id} section={section} {...baseProps} />;
      case 'content-image':
        if(isWhyJoinSection){
          return <WhyJoinSection key={section.id} section={section} {...baseProps} />
        }
        return <ContentImageSection key={section.id} {...baseProps} />;
      case 'image-content':
        return <ContentImageSection key={section.id} reverse={true} {...baseProps} />;
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

      <section className="bg-white py-10">
        <h2 className="text-4xl font-bold text-center text-black uppercase">
          Join C3FC Soccer Today
        </h2>
      </section>
    </div>
  );
};