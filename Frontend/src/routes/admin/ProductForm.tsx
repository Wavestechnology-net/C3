// /src/admin/products/ProductForm.tsx

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../services/apis/productApi";

import { useGetAllMediaQuery } from "../../services/apis/mediaApi";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { ImagePlus } from "lucide-react";
import { toast } from "react-toastify";

type FormData = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

const ProductForm = () => {
  const { id } = useParams();

  const isEdit = Boolean(id);

  const navigate = useNavigate();

  const [mediaModal, setMediaModal] = useState(false);

  const { data: product } = useGetProductByIdQuery(
    Number(id),
    {
      skip: !isEdit,
    }
  );

  const { data: mediaResponse } = useGetAllMediaQuery();

  const [createProduct, { isLoading: creating }] =
    useCreateProductMutation();

  const [updateProduct, { isLoading: updating }] =
    useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<FormData>();

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product]);

  const imageUrl = watch("imageUrl");

  const onSubmit = async (data: FormData) => {
    try {
      if (isEdit) {
        await updateProduct({
          id: Number(id),
          data,
        }).unwrap();

        toast.success("Product updated");
      } else {
        await createProduct(data).unwrap();

        toast.success("Product created");
      }

      navigate("/admin/products");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit Product" : "Add Product"}
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your club products professionally
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* BASIC INFO */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-xl font-semibold">
              Product Information
            </h2>

            <div className="space-y-2">
              <Label>Product Name</Label>

              <Input
                placeholder="Enter product name"
                {...register("name")}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>

              <textarea
                rows={6}
                placeholder="Enter product description"
                className="w-full border rounded-lg p-3 text-sm"
                {...register("description")}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* IMAGE */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold">
              Product Image
            </h2>

            {imageUrl ? (
              <img
                src={
                  import.meta.env.VITE_BASE_API_URL +
                  imageUrl
                }
                className="w-full aspect-square object-cover rounded-xl border"
              />
            ) : (
              <div className="w-full aspect-square rounded-xl border-2 border-dashed flex items-center justify-center text-gray-400">
                No Image Selected
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={() => setMediaModal(true)}
            >
              <ImagePlus size={18} />
              Select From Media Library
            </Button>
          </div>

          {/* PRICING */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-xl font-semibold">
              Pricing & Category
            </h2>

            <div className="space-y-2">
              <Label>Price</Label>

              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("price")}
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>

              <Input
                placeholder="e.g. T-Shirt"
                {...register("category")}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <Button
              type="submit"
              className="w-full"
              disabled={creating || updating}
            >
              {creating || updating
                ? "Saving..."
                : isEdit
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </div>
        </div>
      </form>

      {/* MEDIA MODAL */}
      <Dialog
        open={mediaModal}
        onOpenChange={setMediaModal}
      >
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              Select Product Image
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[70vh] overflow-y-auto">
            {mediaResponse?.data?.map((media) => (
              <div
                key={media.id}
                className="cursor-pointer group"
                onClick={() => {
                  setValue(
                    "imageUrl",
                    media.mediaUrl
                  );

                  setMediaModal(false);
                }}
              >
                <div className="overflow-hidden rounded-xl border group-hover:ring-2 group-hover:ring-blue-500 transition">
                  <img
                    src={
                      import.meta.env
                        .VITE_BASE_API_URL +
                      media.mediaUrl
                    }
                    alt={media.altText}
                    className="w-full h-40 object-cover"
                  />
                </div>

                <p className="text-xs mt-2 truncate text-gray-500">
                  {media.fileName}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;