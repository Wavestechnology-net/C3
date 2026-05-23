import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import {
  Trash2,
  Plus,
  Image as ImageIcon,
} from "lucide-react";

import ImageSelector from "./MediaSelector";

import { useGetAllMediaQuery } from "../services/apis/mediaApi";

interface CarouselJsonManagerProps {
  jsonContent: string;
  onChange: (newJson: string) => void;
}

interface Slide {
  imageId?: number;
  title?: string;
  text?: string;
  ctaText?: string;
  ctaLink?: string;
  date?: string;
}

export default function CarouselJsonManager({
  jsonContent,
  onChange,
}: CarouselJsonManagerProps) {
  const [slides, setSlides] = useState<Slide[]>([]);

  const { data: mediaResponse } =
    useGetAllMediaQuery();

  const media = mediaResponse?.data || [];

  // =========================================
  // PARSE JSON
  // =========================================

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonContent);

      if (Array.isArray(parsed)) {
        setSlides(parsed);
      } else {
        setSlides([]);
      }
    } catch {
      setSlides([]);
    }
  }, [jsonContent]);

  // =========================================
  // UPDATE
  // =========================================

  const updateSlides = (updated: Slide[]) => {
    setSlides(updated);

    onChange(JSON.stringify(updated, null, 2));
  };

  const updateSlideField = (
    index: number,
    field: keyof Slide,
    value: string | number
  ) => {
    const updated = [...slides];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updateSlides(updated);
  };

  const addSlide = () => {
    updateSlides([
      ...slides,
      {
        imageId: 0,
        title: "",
        text: "",
        ctaText: "",
      },
    ]);
  };

  const removeSlide = (index: number) => {
    updateSlides(
      slides.filter((_, i) => i !== index)
    );
  };

  // =========================================
  // GET IMAGE URL
  // =========================================

  const getImageUrl = (imageId?: number) => {
    const mediaItem = media.find(
      (m) => m.id === imageId
    );

    if (!mediaItem) return "";

    return (
      import.meta.env.VITE_BASE_API_URL +
      mediaItem.mediaUrl
    );
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="space-y-6">

      {slides.map((slide, index) => (
        <Card
          key={index}
          className="border border-yellow-100 rounded-3xl overflow-hidden"
        >
          <CardContent className="p-6 space-y-5">

            {/* HEADER */}

            <div className="flex items-center justify-between">

              <h3 className="font-bold text-lg">
                Slide {index + 1}
              </h3>

              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeSlide(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>

            {/* IMAGE + SELECTOR SIDE BY SIDE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* LEFT: IMAGE PREVIEW */}
              <div className="space-y-2">
                <Label>Selected Image</Label>

                {slide.imageId ? (
                  <img
                    src={getImageUrl(slide.imageId)}
                    alt={slide.title}
                    className="w-full h-64 object-cover rounded-2xl border"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center border rounded-2xl text-muted-foreground">
                    No image selected
                  </div>
                )}
              </div>

              {/* RIGHT: IMAGE SELECTOR */}
              <div className="space-y-2">
                <Label>Change Image</Label>
                <ImageSelector
                  selectedImageId={slide.imageId?.toString() || ""}
                  onSelect={(imageId) =>
                    updateSlideField(index, "imageId", Number(imageId))
                  }
                />
              </div>

            </div>

            {/* TITLE */}

            <div className="space-y-2">

              <Label>Title</Label>

              <Input
                value={slide.title || ""}
                onChange={(e) =>
                  updateSlideField(
                    index,
                    "title",
                    e.target.value
                  )
                }
                className="bg-[#fff9df]"
              />
            </div>

            {/* TEXT */}

            <div className="space-y-2">

              <Label>Description</Label>

              <Textarea
                rows={4}
                value={slide.text || ""}
                onChange={(e) =>
                  updateSlideField(
                    index,
                    "text",
                    e.target.value
                  )
                }
                className="bg-[#fff9df]"
              />
            </div>

            {/* CTA */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="space-y-2">

                <Label>CTA Text</Label>

                <Input
                  value={slide.ctaText || ""}
                  onChange={(e) =>
                    updateSlideField(
                      index,
                      "ctaText",
                      e.target.value
                    )
                  }
                  className="bg-[#fff9df]"
                />
              </div>

              <div className="space-y-2">

                <Label>CTA Link</Label>

                <Input
                  value={slide.ctaLink || ""}
                  onChange={(e) =>
                    updateSlideField(
                      index,
                      "ctaLink",
                      e.target.value
                    )
                  }
                  className="bg-[#fff9df]"
                />
              </div>
            </div>

            {/* DATE */}

            {"date" in slide && (
              <div className="space-y-2">

                <Label>Date</Label>

                <Input
                  value={slide.date || ""}
                  onChange={(e) =>
                    updateSlideField(
                      index,
                      "date",
                      e.target.value
                    )
                  }
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* ADD BUTTON */}

      <Button
        type="button"
        onClick={addSlide}
        className="w-full rounded-2xl"
      >
        <Plus size={18} className="mr-2" />
        Add Slide
      </Button>
    </div>
  );
}