import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import {
  UploadCloud,
  Trash2,
  X,
  Search,
  Image as ImageIcon,
  Video,
  Copy,
  Eye,
} from "lucide-react";

import {
  useUploadMediaMutation,
  useDeleteMediaMutation,
  useGetAllMediaQuery,
} from "../../services/apis/mediaApi";

import { toast } from "react-toastify";

type MediaFormData = {
  files: FileList;
};

export default function Media() {
  const [search, setSearch] = useState("");

  const [previewMode, setPreviewMode] = useState(false);

  const [lightbox, setLightbox] = useState<string | null>(null);

  const [previews, setPreviews] = useState<
    {
      file: File;
      url: string;
      type: "image" | "video";
      name: string;
      altText: string;
    }[]
  >([]);

  const { data: mediaResponse, refetch } = useGetAllMediaQuery();

  const [uploadMedia, { isLoading }] =
    useUploadMediaMutation();

  const [deleteMedia] = useDeleteMediaMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<MediaFormData>();

  const files = watch("files");

  // =========================================
  // FILTERED MEDIA
  // =========================================

  const filteredMedia = useMemo(() => {
    return (
      mediaResponse?.data?.filter((media) => {
        const q = search.toLowerCase();

        return (
          media.fileName
            ?.toLowerCase()
            .includes(q) ||
          media.altText
            ?.toLowerCase()
            .includes(q)
        );
      }) || []
    );
  }, [mediaResponse, search]);

  // =========================================
  // STATS
  // =========================================

  const totalAssets =
    mediaResponse?.data?.length || 0;

  const totalImages =
    mediaResponse?.data?.filter(
      (m) => m.mediaType !== "video"
    ).length || 0;

  const totalVideos =
    mediaResponse?.data?.filter(
      (m) => m.mediaType === "video"
    ).length || 0;

  // =========================================
  // PREVIEW
  // =========================================

  const onPreview = () => {
    if (!files || files.length === 0) return;

    const newPreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      name: file.name,
      altText: file.name.split(".")[0],
    }));

    setPreviews(newPreviews);
    setPreviewMode(true);
  };

  // =========================================
  // ALT TEXT
  // =========================================

  const handleAltTextChange = (
    index: number,
    value: string
  ) => {
    setPreviews((prev) =>
      prev.map((p, i) =>
        i === index
          ? { ...p, altText: value }
          : p
      )
    );
  };

  // =========================================
  // UPLOAD
  // =========================================

  const onSubmit = async () => {
    if (previews.length === 0) return;

    try {
      for (const media of previews) {
        await uploadMedia({
          file: media.file,
          altText: media.altText,
        }).unwrap();
      }

      toast.success("Upload successful");

      setPreviews([]);

      setPreviewMode(false);

      reset();

      refetch();
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    }
  };

  // =========================================
  // DELETE
  // =========================================

  const handleDeleteMedia = async (
    id?: number
  ) => {
    if (!id) return;

    if (
      !confirm(
        "Are you sure you want to delete this media?"
      )
    )
      return;

    try {
      await deleteMedia(id).unwrap();

      toast.success("Deleted successfully");

      refetch();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  // =========================================
  // COPY URL
  // =========================================

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);

    toast.success("URL copied");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      name: file.name,
      altText: file.name.split(".")[0],
    }));

    setPreviews(newPreviews);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Media Library
          </h1>

          <p className="text-gray-500 mt-2">
            Upload, organize and manage all
            your website assets.
          </p>
        </div>

        <div className="bg-[#fff7cc] border border-[#f2d14c] px-5 py-3 rounded-2xl shadow-sm">
          <p className="text-sm text-[#7a5d00] font-medium">
            Total Assets
          </p>

          <h2 className="text-2xl font-bold text-[#5c4700]">
            {totalAssets}
          </h2>
        </div>
      </div>

      {/* ================================= */}
      {/* STATS */}
      {/* ================================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Images
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalImages}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#fff6cc] flex items-center justify-center">
              <ImageIcon
                className="text-[#c8a400]"
                size={26}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Total Videos
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalVideos}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Video
                className="text-blue-600"
                size={26}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm">
                Storage Assets
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {totalAssets}
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
              <UploadCloud
                className="text-green-600"
                size={26}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* UPLOAD */}
      {/* ================================= */}

      <div className="bg-white rounded-[30px] border border-gray-200 shadow-sm p-8">

        <form
          onSubmit={handleSubmit(onPreview)}
          className="space-y-8"
        >

          <div className="border-2 border-dashed border-[#e6c94c] bg-gradient-to-br from-[#fffdf2] to-[#fff8d9] rounded-[30px] p-10 text-center hover:shadow-lg transition">

            <div className="w-20 h-20 rounded-3xl bg-white shadow-md flex items-center justify-center mx-auto mb-5">
              <UploadCloud
                className="text-[#c8a400]"
                size={34}
              />
            </div>


            <p className="text-gray-500 mb-6">
              Drag and drop files here or
              browse from your device
            </p>

            <div className="relative inline-block">
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                // className="absolute opacity-0 w-full h-full cursor-pointer"
                // {...register("files", {
                //   required:
                //     "Please select a file",
                // })}
                onChange={handleFileChange}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />

              <Button
                type="button"
                className="bg-black hover:bg-gray-900 text-white rounded-2xl px-8 py-6"
              >
                Select Files
              </Button>
            </div>

            {errors.files && (
              <p className="text-red-500 mt-4 text-sm">
                {errors.files.message}
              </p>
            )}
          </div>

          {/* PREVIEW FILES */}

          {previews.length > 0 && (
            <div>

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl font-bold">
                  Selected Files
                </h2>

                <Button
                  type="button"
                  onClick={onSubmit}
                  disabled={isLoading}
                  className="bg-[#ffe680] hover:bg-[#f5d84e] text-black rounded-xl"
                >
                  {isLoading
                    ? "Uploading..."
                    : "Upload Files"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {previews.map((file, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition"
                  >

                    <div className="relative">

                      {file.type === "image" ? (
                        <img
                          src={file.url}
                          alt={file.altText}
                          className="w-full h-56 object-cover"
                        />
                      ) : (
                        <video
                          controls
                          className="w-full h-56 object-cover"
                        >
                          <source
                            src={file.url}
                          />
                        </video>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setPreviews((prev) =>
                            prev.filter(
                              (_, i) =>
                                i !== index
                            )
                          )
                        }
                        className="absolute top-4 right-4 bg-white hover:bg-red-500 hover:text-white p-2 rounded-full shadow transition"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="p-5">

                      <p className="font-semibold truncate mb-4">
                        {file.name}
                      </p>

                      <Label className="mb-2 block">
                        Alt Text
                      </Label>

                      <Input
                        value={file.altText}
                        onChange={(e) =>
                          handleAltTextChange(
                            index,
                            e.target.value
                          )
                        }
                        className="rounded-xl"
                        placeholder="Enter alt text"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* ================================= */}
      {/* SEARCH */}
      {/* ================================= */}

      <div className="relative">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={18}
        />

        <Input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search media assets..."
          className="pl-12 h-14 rounded-2xl bg-white border-gray-200"
        />
      </div>

      {/* ================================= */}
      {/* MEDIA GRID */}
      {/* ================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filteredMedia.map((media) => {

          const mediaUrl =
            import.meta.env.VITE_BASE_API_URL +
            media.mediaUrl;

          return (
            <div
              key={media.id}
              className="group relative bg-white border border-gray-200 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >

              {/* TYPE BADGE */}

              <div className="absolute top-4 left-4 z-10">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${media.mediaType === "video"
                    ? "bg-blue-600"
                    : "bg-black"
                    }`}
                >
                  {media.mediaType === "video"
                    ? "VIDEO"
                    : "IMAGE"}
                </span>
              </div>

              {/* DELETE */}

              <button
                onClick={() =>
                  handleDeleteMedia(media.id)
                }
                className="absolute top-4 right-4 z-10 bg-white hover:bg-red-500 hover:text-white p-2 rounded-full shadow transition"
              >
                <Trash2 size={16} />
              </button>

              {/* IMAGE */}

              <div className="relative">

                {media.mediaType === "video" ? (
                  <video
                    controls
                    className="w-full h-56 object-cover"
                  >
                    <source src={mediaUrl} />
                  </video>
                ) : (
                  <img
                    src={mediaUrl}
                    alt={media.altText}
                    className="w-full h-56 object-cover"
                  />
                )}

                {/* HOVER OVERLAY */}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">

                  <button
                    onClick={() =>
                      setLightbox(mediaUrl)
                    }
                    className="bg-white text-black rounded-xl px-5 py-2 font-semibold flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5 space-y-3">

                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    File Name
                  </p>

                  <h3 className="font-semibold truncate">
                    {media.fileName}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Alt Text
                  </p>

                  <p className="text-sm text-gray-700 truncate">
                    {media.altText}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">

                  <button
                    onClick={() =>
                      copyUrl(mediaUrl)
                    }
                    className="flex items-center gap-2 text-sm font-medium text-[#9b7a00] hover:text-black transition"
                  >
                    <Copy size={14} />
                    Copy URL
                  </button>

                  <button
                    onClick={() =>
                      setLightbox(mediaUrl)
                    }
                    className="text-sm font-medium text-gray-600 hover:text-black"
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================================= */}
      {/* EMPTY */}
      {/* ================================= */}

      {filteredMedia.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-[30px] p-16 text-center shadow-sm">

          <div className="w-24 h-24 rounded-full bg-[#fff8d9] flex items-center justify-center mx-auto mb-6">
            <ImageIcon
              className="text-[#c8a400]"
              size={38}
            />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            No Media Found
          </h2>

          <p className="text-gray-500">
            Try uploading files or searching
            with another keyword.
          </p>
        </div>
      )}

      {/* ================================= */}
      {/* PREVIEW MODAL */}
      {/* ================================= */}

      <Dialog
        open={previewMode}
        onOpenChange={setPreviewMode}
      >
        <DialogContent className="max-w-5xl rounded-[30px]">

          <DialogHeader>
            <DialogTitle>
              Preview Selected Media
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {previews.map((media, index) => (
              <div
                key={index}
                className="rounded-3xl overflow-hidden border"
              >

                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt={media.altText}
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <video
                    controls
                    className="w-full h-72 object-cover"
                  >
                    <source
                      src={media.url}
                    />
                  </video>
                )}

                <div className="p-4">
                  <p className="font-medium">
                    {media.altText}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              onClick={() =>
                setPreviewMode(false)
              }
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================= */}
      {/* LIGHTBOX */}
      {/* ================================= */}

      <Dialog
        open={!!lightbox}
        onOpenChange={() =>
          setLightbox(null)
        }
      >
        <DialogContent className="max-w-6xl bg-black border-none p-3">

          {lightbox && (
            <img
              src={lightbox}
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}