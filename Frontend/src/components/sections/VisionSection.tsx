import { useMedia } from "../../hooks/useMedia";
import type { SectionDto } from "../../types";

export default function VisionSection({ section }: { section: SectionDto }) {
  const { getMedia } = useMedia();

  const image = section.contents?.find(c => c.contentType === "image");
  const title = section.contents?.find(c => c.contentKey === "section-title");
  const content = section.contents?.find(c => c.contentKey === "content");

  const media = image?.value ? getMedia(parseInt(image.value)) : null;

  return (
    <section className="py-20 px-4 mt-20 mb-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-10 items-start">

        <div className="space-y-4 md:flex md:items-start md:gap-20">

          {/* IMAGE LEFT */}
          <div className="md:w-1/2">
            <img
              src={media?.mediaUrl}
              className="w-full shadow-2xs rounded"
            />
          </div>

          {/* TEXT RIGHT */}
          <div className="md:w-1/2 space-y-4">
            {title && (
              <h2 className="text-3xl font-bold uppercase">
                {title.value}
              </h2>
            )}

            {content && (
              <p className="text-xl">
                {content.value}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}