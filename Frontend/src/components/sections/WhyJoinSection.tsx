import { useMedia } from "../../hooks/useMedia";
import type { ContentDto, MediaDto, SectionDto } from "../../types";

interface WhyJoinSectionProps {
  section: SectionDto;
}

export default function WhyJoinSection({ section }: WhyJoinSectionProps) {
  const imageContent = section.contents?.find((c: ContentDto) => c.contentKey === 'image');
  const imageMediaId = imageContent?.value ? parseInt(imageContent.value) : null;
  const { getMedia } = useMedia();

  const media = imageMediaId ? getMedia(imageMediaId) : { mediaUrl: "/placeholder-image.jpg" } as MediaDto

  // const headline = section.contents?.find((c: ContentDto) => c.contentKey === 'headline');
  // const content = section.contents?.find((c: ContentDto) => c.contentKey === 'content' || c.contentKey === 'closing-text');
  // const reasons = section.contents?.find((c: ContentDto) => c.contentKey === 'reasons' || c.contentKey.includes('benefits'));
  const headline = section.contents?.find(
    (c: ContentDto) =>
      c.contentKey === 'headline' ||
      c.contentKey === 'section-title'
  );

  const contentItems = section.contents?.filter(
    (c: ContentDto) =>
      c.contentKey === 'content' ||
      c.contentKey === 'closing-text'
  );

  return (
    <section className="bg-[#96cfdc] py-5 px-4 relative overflow-visible">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          {headline && (
            <h2 className="text-3xl font-bold uppercase">
              {headline.value}
            </h2>
          )}

          {contentItems?.map((content, index) => (
            <div key={index}>

              {content.contentType === 'json' ? (
                (() => {
                  try {
                    const jsonData = JSON.parse(content.value || '{}');

                    return (
                      <ul className="list-inside pl-5 text-lg text-gray-800 space-y-2">
                        {jsonData.items?.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-yellow-400 font-bold mr-5">
                              {">"}
                            </span>

                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  } catch (e) {
                    return null;
                  }
                })()
              ) : content.contentType === 'html' ? (
                <div
                  dangerouslySetInnerHTML={{ __html: content.value || '' }}
                  className="wysiwyg leading-relaxed"
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: content.value || '' }}
                  className="leading-relaxed"
                />
              )}

            </div>
          ))}

        </div>

        <div className="relative md:-mt-35 z-10">
          <img
            src={media?.mediaUrl}
            alt={media?.altText || "Why join section image"}
            className="w-full max-w-md mx-auto md:-mt-1 shadow-xl rounded"
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