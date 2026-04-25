import { useMedia } from "../../hooks/useMedia";
import type { ContentDto, MediaDto, SectionDto } from "../../types";

interface MissionSectionProps {
  section: SectionDto;
}

export default function MissionSection({ section }: MissionSectionProps) {
  const imageContent = section.contents?.find((c: ContentDto) => c.contentKey === 'image');
  const imageMediaId = imageContent?.value ? parseInt(imageContent.value) : null;
  const { getMediaUrl, getMedia } = useMedia();

  const media = imageMediaId ? getMedia(imageMediaId) : {mediaUrl: "/placeholder-image.jpg" } as MediaDto

//   const imageUrl = imageMediaId 
//     ? (getMediaUrl(imageMediaId) as string)
//     : '/placeholder-image.jpg';

  const headline = section.contents?.find((c: ContentDto) => c.contentKey === 'headline');
  const content = section.contents?.find((c: ContentDto) => 
    c.contentKey.includes('content') || c.contentKey === 'intro-text'
  );

  return (
    <section className="bg-[#dadf26] py-10 px-4 relative overflow-visible">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          {headline && (
            <h2 className="text-3xl font-bold uppercase">
              {headline.value}
            </h2>
          )}
          {content && (
            <div className="text-white text-lg">
              {content.contentType === 'html' ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: content.value || '' }} 
                  className="leading-relaxed"
                />
              ) : (
                <p className="leading-relaxed">{content.value}</p>
              )}
            </div>
          )}
        </div>

        <div className="relative -mt-10 md:-mt-20 z-10">
          <img
            src={media?.mediaUrl}
            alt={media?.altText || "Mission section image"}
            className="w-full max-w-md mx-auto shadow-xl rounded"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
            }}
          />
        </div>
      </div>
    </section>
  );
}