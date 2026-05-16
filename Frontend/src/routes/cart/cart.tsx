import { useState } from "react";
import { useCheckoutMutation } from "../../services/apis/orderApi";
import { clearCart, removeFromCart, updateQuantity } from "../../services/cartSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/cart";
import { toast } from "react-toastify";

export function Cart() {
    const BASE_URL = "http://localhost:5073";
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const [checkout, { isLoading, isSuccess }] = useCheckoutMutation();
    const [isProcessing, setIsProcessing] = useState(false);
    // const [email, setEmail] = useState("");

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        if (isProcessing) return; // 🚨 block double calls immediately

        // if (!email) {
        //     toast.error("Please enter email");
        //     return;
        // }

        setIsProcessing(true); // 🚨 lock instantly

        try {
            const payload = {
                // userEmail: email,
                items: cartItems.map((i) => ({
                    productId: i.productId,
                    quantity: i.quantity,
                    size: i.size,
                })),
            };

            const res = await checkout(payload).unwrap();
            window.location.href = res.checkoutUrl;

        } catch (err) {
            console.error(err);
            toast.error("Checkout failed");
            setIsProcessing(false); // unlock only on failure
        }
    };

    return (
        <div className="bg-white min-h-screen">
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
                            YOUR CART
                        </h1>
                        {/* <p className="text-lg md:text-2xl text-gray-200">
                            Secure access to your dashboard, orders, and account.
                        </p> */}
                    </div>
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
                                        <p className="text-sm text-gray-500 mt-1">
                                            Size: {item.size}
                                        </p>

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
                                                            size: item.size,
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
                                                            size: item.size,
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
                                            dispatch(
                                                removeFromCart({
                                                    productId: item.productId,
                                                    size: item.size,
                                                })
                                            )
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
                            {/* <div className="mt-6">
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
                            </div> */}

                            {/* CHECKOUT */}
                            <button
                                onClick={handleCheckout}
                                disabled={isLoading || isProcessing}
                                className="bg-[#fdc700] hover:bg-yellow-400 w-full py-3 mt-6 font-bold text-black rounded"
                            >
                                {(isLoading || isProcessing) ? "Processing..." : "Proceed to Checkout"}
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