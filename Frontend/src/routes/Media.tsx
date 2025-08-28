import { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { X, Eye, UploadCloud, Trash2 } from "lucide-react";
import {
  useUploadMediaMutation,
  useDeleteMediaMutation,
  useGetAllMediaQuery,
} from "../services/apis/mediaApi";
import { toast } from "react-toastify";

type MediaFormData = {
  files: FileList;
};

export function Media() {
  const [previews, setPreviews] = useState<
    { file: File; url: string; type: "image" | "video"; name: string; altText: string }[]
  >([]);
  const [previewMode, setPreviewMode] = useState(false);

  const { data: mediaResponse, refetch } = useGetAllMediaQuery();
  const [uploadMedia, { isLoading }] = useUploadMediaMutation();
  const [deleteMedia] = useDeleteMediaMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MediaFormData>();

  const onPreview = (data: MediaFormData) => {
    const files = data.files;
    if (!files || files.length === 0) return;

    const newPreviews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      name: file.name,
      altText: file.name,
    }));

    setPreviews(newPreviews);
    setPreviewMode(true);
  };

  const handleAltTextChange = (index: number, value: string) => {
    setPreviews((prev) =>
      prev.map((p, i) => (i === index ? { ...p, altText: value } : p))
    );
  };

  const onSubmit = async () => {
    if (previews.length === 0) return;

    try {
      for (const media of previews) {
        await uploadMedia({ file: media.file, altText: media.altText }).unwrap();
      }

      toast.success("✅ Upload successful!");
      setPreviews([]);
      setPreviewMode(false);
      reset();
      refetch();
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("❌ Upload failed!");
    }
  };

  const handleDeleteMedia = async (id?: number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this media?")) return;

    try {
      await deleteMedia(id).unwrap();
      toast.done("🗑️ Deleted successfully");
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("❌ Delete failed!");
      // alert("❌ Delete failed!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      <h1 className="text-3xl font-extrabold mb-8 text-center">📤 Media Manager</h1>

      {/* Upload Section (moved on top) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">⬆️ Upload New Media</h2>
        <form onSubmit={handleSubmit(onPreview)} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition">
            <Label className="block font-semibold text-lg mb-4">
              Choose files to upload
            </Label>

            <div className="relative inline-block">
              <Input
                type="file"
                multiple
                accept="image/*,video/*"
                className="absolute opacity-0 w-full h-full cursor-pointer"
                {...register("files", { required: "Please select a file" })}
              />
              <Button
                type="button"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md"
              >
                <UploadCloud size={20} /> Choose Files
              </Button>
            </div>

            {errors.files && (
              <p className="text-red-500 text-sm mt-2">{errors.files.message}</p>
            )}
          </div>

          {/* Preview before upload */}
          {previews.length > 0 && (
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <h2 className="font-semibold mb-2">📂 Chosen Files</h2>
              <ul className="space-y-3">
                {previews.map((file, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-white px-3 py-2 rounded-md shadow-sm gap-2"
                  >
                    <span className="truncate">{file.name}</span>

                    <Input
                      type="text"
                      value={file.altText}
                      onChange={(e) => handleAltTextChange(index, e.target.value)}
                      className="sm:w-64 w-full"
                      placeholder="Enter AltText"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setPreviews((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-center gap-6">
            <Button
              type="submit"
              className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg"
            >
              <Eye size={18} /> Preview
            </Button>

            <Button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 rounded-lg"
            >
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </div>

      {/* Existing Media from Database */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📚 Your Uploaded Media</h2>
        {mediaResponse?.data && mediaResponse.data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaResponse.data.map((media) => (
              <div
                key={media.id}
                className="relative rounded-lg shadow-sm overflow-hidden border"
              >
                {media.mediaType === "video" ? (
                  <video controls className="w-full h-32 object-cover">
                    <source src={media.mediaUrl} />
                  </video>
                ) : (
                  <img
                    src={media.mediaUrl}
                    alt={media.altText}
                    className="w-full h-32 object-cover"
                  />
                )}

                <p className="text-center text-xs text-gray-600 p-1 truncate">
                  {media.altText}
                </p>

                <button
                  onClick={() => handleDeleteMedia(media.id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white rounded-full p-1 shadow"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No media uploaded yet.</p>
        )}
      </div>

      {/* Preview Modal */}
      <Dialog open={previewMode} onOpenChange={setPreviewMode}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Preview Selected Media</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {previews.map((media, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt={media.altText}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <video controls className="w-full h-64 object-cover">
                    <source src={media.url} />
                  </video>
                )}
                <p className="text-center mt-2 text-sm text-gray-600">
                  AltText: {media.altText}
                </p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setPreviewMode(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
