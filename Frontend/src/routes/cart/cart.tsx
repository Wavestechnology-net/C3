import { useState } from "react";
import { useCheckoutMutation } from "../../services/apis/orderApi";
import { clearCart, removeFromCart, updateQuantity } from "../../services/cartSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/cart";
import { toast } from "react-toastify";

export function Cart() {
    const BASE_URL = "http://localhost:5073";
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const [checkout, { isLoading }] = useCheckoutMutation();
    const [email, setEmail] = useState("");

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        if (!email) {
            toast.error("Please enter email");
            return;
        }

        try {
            const payload = {
                userEmail: email,
                items: cartItems.map((i) => ({
                    productId: i.productId,
                    quantity: i.quantity,
                })),
            };

            const res = await checkout(payload).unwrap();
            window.location.href = res.checkoutUrl;
        } catch (err) {
            console.error(err);
            toast.error("Checkout failed");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* HERO */}
            <div className="relative h-[250px] w-full">
                <img
                    src="/home-bg-hero.jpg"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Your Cart</h1>
                </div>
            </div>

            <div className="px-4 md:px-16 py-10">
                {cartItems.length === 0 ? (
                    <div className="text-center py-24">
                        <h2 className="text-3xl font-bold text-black">
                            Your cart is empty 🛒
                        </h2>
                        <p className="text-[#dc3973] mt-3">
                            Looks like you haven’t added anything yet
                        </p>

                        <a
                            href="/shop"
                            className="inline-block mt-6 bg-[#fdc700] px-6 py-3 font-bold text-black"
                        >
                            Go to Shop
                        </a>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* ITEMS */}
                        <div className="md:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex flex-col md:flex-row gap-6 border p-5 rounded-xl shadow-sm hover:shadow-md transition"
                                >
                                    <img
                                        src={`${BASE_URL}${item.imageUrl}`}
                                        alt={item.name}
                                        className="w-full md:w-40 h-40 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-black">
                                            {item.name}
                                        </h2>

                                        <p className="text-[#dc3973] font-semibold mt-1">
                                            ${item.price}
                                        </p>

                                        {/* Quantity */}
                                        <div className="flex items-center gap-4 mt-4">
                                            <button
                                                className="px-3 py-1 bg-gray-200 rounded"
                                                onClick={() =>
                                                    dispatch(
                                                        updateQuantity({
                                                            productId: item.productId,
                                                            quantity: Math.max(1, item.quantity - 1),
                                                        })
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span className="font-bold text-lg">
                                                {item.quantity}
                                            </span>

                                            <button
                                                className="px-3 py-1 bg-gray-200 rounded"
                                                onClick={() =>
                                                    dispatch(
                                                        updateQuantity({
                                                            productId: item.productId,
                                                            quantity: item.quantity + 1,
                                                        })
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            dispatch(removeFromCart(item.productId))
                                        }
                                        className="text-red-500 font-semibold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* SUMMARY */}
                        <div className="bg-gray-50 border p-6 rounded-xl shadow-md h-fit">
                            <h2 className="text-2xl font-bold text-black mb-4">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between mb-4">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>

                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            {/* EMAIL */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="w-full border px-3 py-2 rounded"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* CHECKOUT */}
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading}
                                className="bg-[#fdc700] hover:bg-yellow-400 w-full py-3 mt-6 font-bold text-black rounded"
                            >
                                {isLoading ? "Processing..." : "Proceed to Checkout"}
                            </button>

                            <button
                                onClick={() => dispatch(clearCart())}
                                className="mt-4 text-sm text-gray-500 underline w-full"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}