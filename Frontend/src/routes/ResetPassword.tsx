import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../services/apis/authApi";

export default function ResetPassword() {
    const [params] = useSearchParams();

    const email = params.get("email") || "";
    const token = params.get("token") || "";

    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState("");

    const [resetPassword, { isLoading }] =
        useResetPasswordMutation();

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            const res = await resetPassword({
                email,
                token,
                newPassword: password,
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
                    Reset Password
                </h1>

                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    {isLoading
                        ? "Resetting..."
                        : "Reset Password"}
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