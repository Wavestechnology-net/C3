import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../services/apis/productApi";
import { useAppDispatch } from "../../hooks/cart";
import { addToCart } from "../../services/cartSlice";
import { toast } from "react-toastify";

export function Shop() {
    const BASE_URL = "http://localhost:5073";
    const { data, isLoading, isError, error } = useGetProductsQuery();
    const dispatch = useAppDispatch();
    const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

    const [category, setCategory] = useState("");

    const products = data || [];

    const filteredProducts = category
        ? products.filter((p: any) => p.category === category)
        : products;

    useEffect(() => {
        if (!isLoading && filteredProducts.length === 0) {
            toast("No products found");
        }
    }, [isLoading, filteredProducts]);

    return (
        <div className="bg-white min-h-screen">
            {/* HERO */}
            <div className="relative h-[300px] w-full">
                <img
                    src="/home-bg-hero.jpg"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl mt-10 font-bold text-white">
                        Club Shop
                    </h1>
                </div>
            </div>

            {/* CONTENT */}
            <div className="px-4 md:px-16 py-10">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-black">
                        Shop Products
                    </h2>

                    {/* FILTER */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border px-4 py-2 rounded"
                    >
                        <option value="">All</option>
                        <option value="tshirt">T-Shirts</option>
                        <option value="shorts">Shorts</option>
                        <option value="shoes">Shoes</option>
                    </select>
                </div>

                {/* LOADING STATE */}
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                className="h-64 bg-gray-200 animate-pulse rounded"
                            />
                        ))}
                    </div>
                )}

                {/* EMPTY STATE */}
                {!isLoading && filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-semibold text-black">
                            No products available
                        </h3>
                        <p className="text-[#dc3973] mt-2">
                            Please check back later
                        </p>
                    </div>
                )}

                {/* PRODUCT GRID */}
                {!isLoading && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {filteredProducts.map((product: any) => (
                            <div
                                key={product.productId}
                                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                            >
                                {/* IMAGE */}
                                <img
                                    src={`${BASE_URL}${product.imageUrl}`}
                                    alt={product.name}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder.png";
                                    }}
                                    className="w-full h-64 object-cover"
                                />

                                {/* DETAILS */}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-black">
                                        {product.name}
                                    </h3>

                                    <p className="text-[#dc3973] font-semibold mt-1">
                                        ${product.price}
                                    </p>
                                    <div className="mt-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Select Size
                                        </label>

                                        <select
                                            value={selectedSizes[product.productId] || ""}
                                            onChange={(e) =>
                                                setSelectedSizes((prev) => ({
                                                    ...prev,
                                                    [product.productId]: e.target.value,
                                                }))
                                            }
                                            className="w-full border px-3 py-2 rounded"
                                        >
                                            <option value="">Choose Size</option>
                                            <option value="S">Small</option>
                                            <option value="M">Medium</option>
                                            <option value="L">Large</option>
                                            <option value="XL">XL</option>
                                        </select>
                                    </div>
                                    {/* BUTTON */}
                                    <button
                                        // onClick={() => {
                                        //     dispatch(
                                        //         addToCart({
                                        //             productId: product.productId,
                                        //             name: product.name,
                                        //             price: product.price,
                                        //             imageUrl: product.imageUrl,
                                        //         })
                                        //     );

                                        //     toast.success(`${product.name} added to cart 🛒`);
                                        // }}
                                        onClick={() => {
                                            const selectedSize = selectedSizes[product.productId];

                                            if (!selectedSize) {
                                                toast.error("Please select a size");
                                                return;
                                            }

                                            dispatch(
                                                addToCart({
                                                    productId: product.productId,
                                                    name: product.name,
                                                    price: product.price,
                                                    imageUrl: product.imageUrl,
                                                    size: selectedSize,
                                                })
                                            );

                                            toast.success(
                                                `${product.name} (${selectedSize}) added to cart 🛒`
                                            );
                                        }}
                                        className="bg-[#fdc700] hover:bg-yellow-400 w-full mt-4 py-2 font-bold text-black"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}