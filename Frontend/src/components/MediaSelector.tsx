import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";

import {
  Search,
  Image as ImageIcon,
  UploadCloud,
} from "lucide-react";

import {
  useGetAllMediaQuery,
  useUploadMediaMutation,
} from "../services/apis/mediaApi";

interface ImageSelectorProps {
  selectedImageId: string;
  onSelect: (imageId: string) => void;
}

export default function ImageSelector({
  selectedImageId,
  onSelect,
}: ImageSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: mediaResponse, refetch } =
    useGetAllMediaQuery();

  const [uploadMedia, { isLoading: isUploading }] =
    useUploadMediaMutation();

  const media = mediaResponse?.data || [];

  const selectedMedia = media.find(
    (m) => String(m.id) === String(selectedImageId)
  );

  const filteredMedia = useMemo(() => {
    return media.filter(
      (m) =>
        m.fileName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        m.altText
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [media, searchTerm]);

  const selectedImageUrl = selectedMedia
    ? `${import.meta.env.VITE_BASE_API_URL}${selectedMedia.mediaUrl}`
    : "";



  // =========================================
  // UPLOAD DIRECTLY
  // =========================================

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    try {
      const file = files[0];

      const response = await uploadMedia({
        file,
        altText: file.name.split(".")[0],
      }).unwrap();

      await refetch();

      if (response?.data?.id) {
        onSelect(response.data.id.toString());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">

      {selectedMedia && (
        <div className="relative group overflow-hidden rounded-2xl border">

          <img
            src={selectedImageUrl}
            alt={selectedMedia.altText}
            className="w-full max-h-72 object-cover"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">

            <span className="opacity-0 group-hover:opacity-100 text-white font-semibold transition">
              Change Image
            </span>
          </div>
        </div>
      )}

      {/* ACTION BUTTONS */}

      <div className="flex flex-col sm:flex-row gap-3">

        {/* MEDIA LIBRARY */}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>

          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
            >
              <ImageIcon className="mr-2 h-4 w-4" />

              {selectedMedia
                ? "Change Image"
                : "Select Image"}
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-6xl min-w-4xl">

            <DialogHeader>
              <DialogTitle>
                Select Image
              </DialogTitle>
            </DialogHeader>

            {/* SEARCH */}

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search images..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>

            {/* GRID */}

            <ScrollArea className="h-[600px] mt-4">

              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">

                {filteredMedia.map((m) => {

                  const imageUrl =
                    import.meta.env
                      .VITE_BASE_API_URL +
                    m.mediaUrl;

                  return (
                    <Card
                      key={m.id}
                      onClick={() => {
                        onSelect(m.id.toString());
                        setIsOpen(false);
                      }}
                      className={`cursor-pointer overflow-hidden border-2 transition hover:scale-[1.02]
                        
                        ${selectedImageId ===
                          m.id.toString()
                          ? "border-yellow-400"
                          : "border-transparent"
                        }
                      `}
                    >
                      <CardContent className="p-0">

                        <img
                          src={imageUrl}
                          alt={m.altText}
                          className="w-full h-40 object-cover"
                        />

                        <div className="p-3">
                          <p className="font-medium text-sm truncate">
                            {m.fileName}
                          </p>

                          <p className="text-xs text-muted-foreground truncate">
                            {m.altText}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* UPLOAD */}

        {/* <div className="relative">

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <Button
            type="button"
            className="w-full"
            disabled={isUploading}
          >
            <UploadCloud className="mr-2 h-4 w-4" />

            {isUploading
              ? "Uploading..."
              : "Upload Image"}
          </Button>
        </div> */}
      </div>
    </div>
  );
}