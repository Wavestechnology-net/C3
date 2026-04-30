export function CancelPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-4xl font-bold text-black">
                Payment Cancelled
            </h1>

            <p className="text-[#dc3973] mt-2">
                You can try again anytime
            </p>

            <a href="/cart" className="mt-6 bg-[#fdc700] px-6 py-3 font-bold">
                Back to Cart
            </a>
        </div>
    );
}