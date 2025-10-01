import { useMedia } from "../../hooks/useMedia";
import type { ContentDto, SectionDto } from "../../types";

interface HeroSectionProps {
  section: SectionDto;
}

export default function HeroSection ({ section }: HeroSectionProps){
    const backgroundImageContent = section.contents?.find((c: ContentDto) => c.contentKey === 'background-image');
    const backgroundMediaId = backgroundImageContent?.value ? parseInt(backgroundImageContent.value) : null;
    const {mediaUrls, getMediaUrl} = useMedia()

    const backgroundImageUrl = backgroundMediaId && mediaUrls
        ? getMediaUrl(backgroundMediaId)
        : '/placeholder-hero.jpg';
        
  return (
    <section
      className="relative bg-cover bg-center h-[100vh] text-white flex items-center justify-center flex-col text-center"
      style={{
        backgroundImage: `url('${backgroundImageUrl}')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 px-4 max-w-4xl">
        {section.contents?.map((content: ContentDto) => {
          if (content.contentKey === 'headline') {
            return (
              <h1 key={content.id} className="text-4xl md:text-6xl font-bold mb-4">
                {content.value}
              </h1>
            );
          }
          if (content.contentKey === 'subhead') {
            return (
              <p key={content.id} className="text-xl md:text-2xl mt-2">
                {content.value}
              </p>
            );
          }
          if (content.contentKey === 'cta-text') {
            return (
              <button 
                key={content.id} 
                className="bg-yellow-300 hover:bg-yellow-400 px-6 py-3 font-bold text-black uppercase w-full sm:w-auto mt-6 transition-colors"
              >
                {content.value}
              </button>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
};