import { useMemo } from "react";
import { useGetPageBySlugQuery } from "../../services/apis/publicApi";
import { useMedia } from "../../hooks/useMedia";
import HeroSection from "../../components/sections/HeroSection";
import ContentSection from "../../components/sections/ContentSection";
import ContentImageSection from "../../components/sections/ContentImageSection";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";
import type { SectionDto } from "../../types";
import WhyJoinSection from "../../components/sections/WhyJoinSection";

export default function Competitive() {
  const {
    data: pageData,
    isLoading: pageLoading,
    isError: pageError,
    // error: pageErrorDetails,
  } = useGetPageBySlugQuery('competitive', {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  const { isLoading: mediaLoading, isError: mediaError } = useMedia();

  // const [showFallback, setShowFallback] = useState(false);

  const sortedSections = useMemo(() => {
    if (!pageData?.sections) return [];
    return [...pageData.sections].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [pageData?.sections]);

  // Check for backend down scenario
  // useEffect(() => {
  //   if ((pageError || mediaError) && !pageData) {
  //     const isNetworkError = 
  //       (pageErrorDetails as any)?.error?.includes('Network Error') ||
  //       (pageErrorDetails as any)?.status === 'FETCH_ERROR';

  //     if (isNetworkError) {
  //       const timer = setTimeout(() => {
  //         setShowFallback(true);
  //       }, 1000);

  //       return () => clearTimeout(timer);
  //     }
  //   }
  // }, [pageError, mediaError, pageErrorDetails, pageData]);

  const isLoading = pageLoading || mediaLoading;
  const isError = pageError || mediaError;

  // Show fallback when backend is down
  // if (showFallback) {
  //   return <CompetitiveFallback />;
  // }

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
        if (isWhyJoinSection) {
          return <WhyJoinSection key={section.id} section={section} />
        }
        return <ContentImageSection key={section.id} section={section} />;
      case 'image-content':
        return <ContentImageSection key={section.id} section={section} reverse={true} />;
      // case 'cta':
      //   return <CtaSection key={section.id} section={section} />;
      default:
        return <ContentSection key={section.id} section={section} />;
    }
  };

  return (
    <div className="font-sans text-[#1d2033]">
      {sortedSections.map(renderSection)}

      <section className="bg-white py-10">
        <h2 className="text-4xl font-bold text-center text-black uppercase">
          Join C3FC Soccer Today
        </h2>
      </section>
    </div>
  );
};