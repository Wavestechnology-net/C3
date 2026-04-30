import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/cart";
import { clearCart } from "../../services/cartSlice";

export function Success() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-4xl font-bold text-black">
                Payment Successful 🎉
            </h1>
            <p className="text-[#dc3973] mt-2">
                Your order has been placed successfully
            </p>

            <a href="/shop" className="mt-6 bg-[#fdc700] px-6 py-3 font-bold">
                Continue Shopping
            </a>
        </div>
    );
}