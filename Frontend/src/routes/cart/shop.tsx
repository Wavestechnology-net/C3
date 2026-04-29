import { useAppDispatch } from "../../hooks/cart";
import { useGetProductsQuery } from "../../services/apis/productApi";
import { addToCart } from "../../services/cartSlice";

export function Shop() {
    const { data, isLoading, isError } = useGetProductsQuery();
    const dispatch = useAppDispatch();

    const products = data?.data || []; // adjust if your ApiResponse wrapper differs

    if (isLoading) {
        return <div className="p-10 text-center">Loading products...</div>;
    }

    if (isError) {
        return <div className="p-10 text-center text-red-500">Error loading products</div>;
    }

    return (
        <div className="bg-white min-h-screen px-4 md:px-16 py-10">
            <h1 className="text-4xl font-bold text-black mb-8">Shop</h1>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product: any) => (
                    <div
                        key={product.productId}
                        className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                    >
                        {/* IMAGE */}
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-64 object-cover"
                        />

                        {/* CONTENT */}
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-black">
                                {product.name}
                            </h2>

                            <p className="text-[#dc3973] font-semibold mt-1">
                                ${product.price}
                            </p>

                            {/* ADD TO CART */}
                            <button
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            productId: product.productId,
                                            name: product.name,
                                            price: product.price,
                                            imageUrl: product.imageUrl,
                                        })
                                    )
                                }
                                className="bg-[#fdc700] hover:bg-yellow-400 w-full mt-4 py-2 font-bold text-black"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}