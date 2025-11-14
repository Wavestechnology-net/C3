import { useContentByKey, useSectionContent, type PageData } from "@/hooks/usePublicPage";
import { useMedia } from '@/hooks/useMedia';

interface HeroSectionProps {
  sectionId: number;
  pageData: PageData;
}

export default function HeroSection({ sectionId, pageData }: HeroSectionProps) {
  const { content, hasContent } = useSectionContent(pageData, sectionId);  
  const backgroundImageContent = useContentByKey(content || [], "background-image");
  const {getMediaUrl} = useMedia()

  const backgroundImageUrl = backgroundImageContent?.value 
    ? getMediaUrl(parseInt(backgroundImageContent?.value))
    : '/placeholder-hero.jpg'

  const headline = useContentByKey(content || [], "headline");
  const subhead = useContentByKey(content || [], "subhead");
  const ctaText = useContentByKey(content || [], "cta-text");

  if (!hasContent) {
    return (
      <section className="relative bg-cover bg-center h-[100vh] flex items-center justify-center flex-col text-center">
        <p>No content found</p>
      </section>
    );
  }

  return (
    <section
      className="relative bg-cover bg-center h-[100vh] text-white flex items-center justify-center flex-col text-center"
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 px-4 max-w-4xl">
        {headline && (
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {headline.value}
          </h1>
        )}
        
        {subhead && (
          <p className="text-xl md:text-2xl mt-2">
            {subhead.value}
          </p>
        )}
        
        {ctaText && (
          <button 
            className="bg-yellow-300 hover:bg-yellow-400 px-6 py-3 font-bold text-black uppercase w-full sm:w-auto mt-6 transition-colors"
          >
            {ctaText.value}
          </button>
        )}
      </div>
    </section>
  );
}