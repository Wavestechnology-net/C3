import { useMemo } from "react";
import { useGetPageBySlugQuery } from "../../services/apis/publicApi";
import HeroSection from "../../components/sections/HeroSection";
import ContentSection from "../../components/sections/ContentSection";
import ContentImageSection from "../../components/sections/ContentImageSection";
// import { useGetAllMediaQuery } from "../../services/apis/mediaApi";
import type { SectionDto } from "../../types";
import PageDataErrorFallback from "../../components/PageDataErrorFallback";
import WhyJoinSection from "../../components/sections/WhyJoinSection";

export default function YouthAcademy(){
  const { 
    data: pageData, 
    isLoading,
    isError
    // isLoading: pageLoading, 
    // isError: pageError, 
  } = useGetPageBySlugQuery('youth-academy', {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

//   const { 
//      data: mediaData, 
//     isLoading: mediaLoading, 
//     isError: mediaError 
//   } = useGetAllMediaQuery();

//   const [showFallback, setShowFallback] = useState(false);

  // Create media URL lookup map
//   const mediaUrls = useMemo(() => {
//     if (!mediaData?.data) return {};
//     return mediaData.data.reduce((acc, media: MediaDto) => {
//       acc[media.id] = media.mediaUrl;
//       return acc;
//     }, {} as Record<number, string>);
//   }, [mediaData]);

  const sortedSections = useMemo(() => {
    if (!pageData?.sections) return [];
    return [...pageData.sections].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [pageData?.sections]);

  // Check for backend down scenario
//   useEffect(() => {
//     if ((pageError || mediaError) && !pageData) {
//       const isNetworkError = 
//         (pageErrorDetails)?.error?.includes('Network Error') ||
//         (pageErrorDetails)?.status === 'FETCH_ERROR';
      
//       if (isNetworkError) {
//         const timer = setTimeout(() => {
//           setShowFallback(true);
//         }, 1000);
        
//         return () => clearTimeout(timer);
//       }
//     }
//   }, [pageError, mediaError, pageErrorDetails, pageData]);

//   const isLoading = pageLoading || mediaLoading;
//   const isError = pageError || mediaError;

  // Show fallback when backend is down
//   if (showFallback) {
//     return (
//       <div className="w-full">
//         <iframe 
//           src="/fallback/youth-academy.html" 
//           className="w-full h-screen border-0"
//           title="Fallback Youth Academy Page"
//         />
//       </div>
//     );
//   }

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
    //   case 'cta':
    //     return <CtaSection key={section.id} section={section} />;
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