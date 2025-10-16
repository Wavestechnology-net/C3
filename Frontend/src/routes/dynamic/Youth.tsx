import { useState, useEffect, useMemo } from "react";
import * as pageService from "../../services/pageService";
import HeroSection from "../../components/sections/HeroSection";
import ContentSection from "../../components/sections/ContentSection";
import ContentImageSection from "../../components/sections/ContentImageSection";
import type { PageDto, SectionDto } from "../../types";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";
import WhyJoinSection from "../../components/sections/WhyJoinSection";

export default function YouthAcademy(){
  const [pageData, setPageData] = useState<PageDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await pageService.getPageBySlug('youth-academy');
        setPageData(data);
      } catch (error) {
        setIsError(true);
        console.error("Failed to fetch page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, []);

  const sortedSections = useMemo(() => {
    if (!pageData?.sections) return [];
    return [...pageData.sections].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [pageData?.sections]);

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

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Page not found</h1>
        </div>
      </div>
    );
  }

  const renderSection = (section: SectionDto) => {
    const isWhyJoinSection = section.name?.toLowerCase().includes('why') || 
                      section.name?.toLowerCase().includes('join');

    
    switch (section.sectionType) {
      case 'hero':
        return <HeroSection key={section.id} section={section} />;
      case 'content':
        return <ContentSection key={section.id} section={section} />;
      case 'content-image':
        if(isWhyJoinSection){
          return <WhyJoinSection key={section.id} section={section} />
        }
        return <ContentImageSection key={section.id} section={section} />;
      case 'image-content':
        return <ContentImageSection key={section.id} section={section} reverse={true} />;
      default:
        return <ContentSection key={section.id} section={section} />;
    }
  };

  return (
    <div className="font-sans text-[#1d2033]">
      {sortedSections.map(renderSection)}

       <section className="bg-white py-30">
        <h2 className="text-4xl font-bold text-center text-black uppercase">
          RISE with C3FC SOCCER Club
        </h2>
      </section>
    </div>
  );
};