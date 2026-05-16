import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../services/apis/productApi";
import { useAppDispatch } from "../../hooks/cart";
import { addToCart } from "../../services/cartSlice";
import { toast } from "react-toastify";

export function Shop() {
    const BASE_URL = "http://localhost:5073";
    const { data, isLoading } = useGetProductsQuery();
    const dispatch = useAppDispatch();

    const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
    const [category, setCategory] = useState("");

    const products = data || [];

    const filteredProducts = category
        ? products.filter(
            (p: any) =>
                p.category?.toLowerCase().replace("-", "") ===
                category.toLowerCase()
        )
        : products;

    useEffect(() => {
        if (!isLoading && filteredProducts.length === 0) {
            toast.info("No products found");
        }
    }, [isLoading, filteredProducts]);

    const categories = [
        { key: "", label: "All" },
        { key: "tshirt", label: "T-Shirts" },
        { key: "shorts", label: "Shorts" },
        { key: "shoes", label: "Shoes" },
    ];

    return (
        <div className="bg-[#f8f8f8] min-h-screen">

            {/* HERO SECTION */}
            <div className="relative h-[420px] w-full overflow-hidden">
                <img
                    src="/home-bg-hero.jpg"
                    alt="Login Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex items-center px-6 md:px-24">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-4xl md:text-5xl mt-20 font-bold mb-4">
                            WELCOME TO CLUB SHOP
                        </h1>
                        {/* <p className="text-lg md:text-2xl text-gray-200">
                            Secure access to your dashboard, orders, and account.
                        </p> */}
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-25">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">

                    <h2 className="text-2xl font-bold text-black">
                        Explore Products
                    </h2>

                    {/* CATEGORY PILLS */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setCategory(cat.key)}
                                className={`px-5 py-2 rounded-full border transition text-sm font-medium
                                    ${category === cat.key
                                        ? "bg-black text-white"
                                        : "bg-white text-black hover:bg-black hover:text-white"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* LOADING */}
                {isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="h-[320px] bg-gray-200 animate-pulse rounded-2xl"
                            />
                        ))}
                    </div>
                )}

                {/* EMPTY */}
                {!isLoading && filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-semibold text-black">
                            No products found
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Try selecting another category
                        </p>
                    </div>
                )}

                {/* PRODUCT GRID */}
                {!isLoading && filteredProducts.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {filteredProducts.map((product: any) => (
                            <div
                                key={product.productId}
                                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >

                                {/* IMAGE - WIDER RATIO */}
                                <div className="relative overflow-hidden">
                                    <img
                                        src={`${BASE_URL}${product.imageUrl}`}
                                        alt={product.name}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/placeholder.png";
                                        }}
                                        className="w-full aspect-[5/4] object-cover group-hover:scale-105 transition duration-500"
                                    />

                                    <div className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 rounded-full">
                                        NEW
                                    </div>
                                </div>

                                {/* DETAILS - COMPACT */}
                                <div className="p-3">

                                    <h3 className="text-sm font-semibold text-black line-clamp-1">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-base font-bold text-[#dc3973]">
                                            ${product.price}
                                        </p>

                                        <span className="text-[11px] text-gray-400">
                                            In Stock
                                        </span>
                                    </div>

                                    {/* SIZE */}
                                    <select
                                        value={selectedSizes[product.productId] || ""}
                                        onChange={(e) =>
                                            setSelectedSizes((prev) => ({
                                                ...prev,
                                                [product.productId]: e.target.value,
                                            }))
                                        }
                                        className="w-full mt-2 border px-2 py-1.5 rounded-lg text-sm"
                                    >
                                        <option value="">Size</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>

                                    {/* BUTTON */}
                                    <button
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
                                        className="w-full mt-2 bg-black hover:bg-[#dc3973] text-white py-2 rounded-xl text-sm transition"
                                    >
                                        Add to Cart
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>

            {/* SOCIAL SECTION */}
            <div className="bg-gray-100 py-12 px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-6">
                        Stay connected with us
                    </h2>

                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="#" rel="noopener noreferrer">
                            <img
                                src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5ef3bd892340e3bac23e1ac0_icon-facebook-navy.svg"
                                alt="Facebook"
                                className="h-6"
                            />
                        </a>

                        <a href="#" rel="noopener noreferrer">
                            <img
                                src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5ec3f83f2c0e493e867f635a_icon-instagram.svg"
                                alt="Instagram"
                                className="h-6"
                            />
                        </a>

                        <a href="#" rel="noopener noreferrer">
                            <img
                                src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5f3edfb9bd14edb0979b03f8_icon-twitter-blue.svg"
                                alt="Twitter"
                                className="h-6"
                            />
                        </a>

                        <a href="#" rel="noopener noreferrer">
                            <img
                                src="https://cdn.prod.website-files.com/5eb043b98cf9c48746832cbb/5f3edf1fcd1f34f55a689236_icon-youtube-pink.svg"
                                alt="YouTube"
                                className="h-6"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}