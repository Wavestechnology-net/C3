import { useMemo } from "react";
import { useGetPageBySlugQuery } from "../../services/apis/publicApi";
import HeroSection from "../../components/sections/HeroSection";
import ContentSection from "../../components/sections/ContentSection";
import type { SectionDto } from "../../types";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";
import MissionSection from "../../components/sections/MissionSection";
import VisionSection from "../../components/sections/VisionSection";

export default function About() {
  const {
    data: pageData,
    isLoading,
    isError
    // isLoading: pageLoading, 
    // isError: pageError
  } = useGetPageBySlugQuery('about', {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

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

  const getSectionLayout = (section: SectionDto) => {
    const name = section.name?.toLowerCase();

    if (name?.includes("mission")) return "mission";
    if (name?.includes("vision")) return "vision";

    return section.sectionType;
  };
  const renderSection = (section: SectionDto) => {
    const layout = getSectionLayout(section);

    switch (layout) {
      case "hero":
        return <HeroSection key={section.id} section={section} />;

      case "content":
        return <ContentSection key={section.id} section={section} />;

      case "mission":
        return <MissionSection key={section.id} section={section} />;

      case "vision":
        return <VisionSection key={section.id} section={section} />;

      default:
        return <ContentSection key={section.id} section={section} />;
    }
  };

  return (
    <div className="font-sans text-[#1d2033]">
      {sortedSections.map(renderSection)}

      <section className="bg-white pb-20">
        <h2 className="text-4xl font-bold text-center text-black uppercase font-serif">
          RISE WITH US
        </h2>
      </section>
    </div>
  );
};