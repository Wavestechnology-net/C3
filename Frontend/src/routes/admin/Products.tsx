// /src/admin/products/Products.tsx

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../services/apis/productApi";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 10;

const Products = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return [...products]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
  }, [products, search]);

  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: number) => {
    const confirmed = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id).unwrap();

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>

          <p className="text-gray-500 mt-1">
            Manage all club products
          </p>
        </div>

        <Link to="/admin/products/new">
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            Add Product
          </Button>
        </Link>
      </div>

      {/* SEARCH */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <Input
            placeholder="Search products..."
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4 font-semibold">Image</th>
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Category</th>
                <th className="text-left p-4 font-semibold">Price</th>
                <th className="text-left p-4 font-semibold">Created</th>
                <th className="text-center p-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-10 text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr
                    key={product.productId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* IMAGE */}
                    <td className="p-4">
                      <img
                        src={
                          import.meta.env.VITE_BASE_API_URL +
                          product.imageUrl
                        }
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                    </td>

                    {/* NAME */}
                    <td className="p-4">
                      <div className="font-semibold">
                        {product.name}
                      </div>

                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description}
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="p-4 font-semibold">
                      ${product.price}
                    </td>

                    {/* CREATED */}
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(
                        product.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/admin/products/edit/${product.productId}`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Pencil size={14} />
                            Edit
                          </Button>
                        </Link>

                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() =>
                            handleDelete(product.productId)
                          }
                        >
                          <Trash2 size={14} />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  page * ITEMS_PER_PAGE,
                  filteredProducts.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {filteredProducts.length}
              </span>{" "}
              products
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
              >
                <ChevronLeft size={16} />
              </Button>

              <div className="text-sm font-medium">
                Page {page} of {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;