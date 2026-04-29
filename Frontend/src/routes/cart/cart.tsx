import { useState } from "react";
import { useCheckoutMutation } from "../../services/apis/orderApi";
import { clearCart, removeFromCart, updateQuantity } from "../../services/cartSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/cart";

export function Cart() {
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
            alert("Please enter email");
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

            // Redirect to Stripe
            window.location.href = res.checkoutUrl;
        } catch (err) {
            console.error(err);
            alert("Checkout failed");
        }
    };

    return (
        <div className="bg-white min-h-screen px-4 md:px-16 py-10">
            <h1 className="text-4xl font-bold text-black mb-8">Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-black">
                        Your cart is empty 🛒
                    </h2>
                    <p className="text-[#dc3973] mt-2">
                        Add some items from the shop
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-10">
                    {/* LEFT SIDE - ITEMS */}
                    <div className="md:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div
                                key={item.productId}
                                className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-lg shadow-sm"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-32 h-32 object-cover rounded"
                                />

                                <div className="flex-1 w-full">
                                    <h2 className="text-lg font-bold text-black">
                                        {item.name}
                                    </h2>

                                    <p className="text-[#dc3973] font-semibold">
                                        ${item.price}
                                    </p>

                                    {/* Quantity */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <button
                                            className="px-3 py-1 bg-gray-200"
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

                                        <span className="font-bold">{item.quantity}</span>

                                        <button
                                            className="px-3 py-1 bg-gray-200"
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

                                {/* Remove */}
                                <button
                                    onClick={() => dispatch(removeFromCart(item.productId))}
                                    className="text-red-500 font-bold"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT SIDE - SUMMARY */}
                    <div className="border p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-2xl font-bold text-black mb-4">
                            Order Summary
                        </h2>

                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between mb-4">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>

                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {/* EMAIL INPUT */}
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-black mb-1">
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

                        {/* CHECKOUT BUTTON */}
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="bg-[#fdc700] hover:bg-yellow-400 w-full py-3 mt-6 font-bold text-black"
                        >
                            {isLoading ? "Processing..." : "Proceed to Checkout"}
                        </button>

                        {/* CLEAR CART */}
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
    );
}