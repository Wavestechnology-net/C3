import { useState } from "react";
import { useForgotPasswordMutation } from "../services/apis/authApi";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const [success, setSuccess] = useState("");

    const [forgotPassword, { isLoading }] =
        useForgotPasswordMutation();

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const res = await forgotPassword({
                email,
            }).unwrap();

            setSuccess(res.message);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-xl shadow"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Forgot Password
                </h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    {isLoading
                        ? "Sending..."
                        : "Send Reset Link"}
                </button>

                {success && (
                    <p className="text-green-600 mt-4">
                        {success}
                    </p>
                )}
            </form>
        </div>
    );
}