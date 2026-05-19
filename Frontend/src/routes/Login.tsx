import { useState } from "react";
import * as Yup from "yup";
import {
    useGoogleLoginMutation,
    useLoginMutation
} from "../services/apis/authApi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSuccess } from "../services/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAuth } from "../hooks/cart";
import { toast } from "react-toastify";

const schema = Yup.object({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
});

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [login] = useLoginMutation();
    const [googleLogin] = useGoogleLoginMutation();
    const { isAuthenticated } = useAuth();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    if (isAuthenticated) {
        return <Navigate to="/user-dashboard" />;
    }

    const onSubmit = async (data: any) => {
        try {
            const res = await login(data).unwrap();

            dispatch(
                loginSuccess({
                    token: res.token,
                    refreshToken: res.refreshToken,
                    user: res.user,
                    expiresAt: res.expiresAt,
                })
            );
            toast.success("Successful login.")
            navigate("/user-dashboard");
        } catch (err) {
            console.log(err);
            toast.error("Incorrect username or password.")
        }
    };

    const handleGoogle = async (credentialResponse: any) => {
        try {
            const res = await googleLogin({
                idToken: credentialResponse.credential,
            }).unwrap();

            dispatch(
                loginSuccess({
                    token: res.token,
                    refreshToken: res.refreshToken,
                    user: res.user,
                    expiresAt: res.expiresAt,
                })
            );

            navigate("/user-dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-8xl mx-auto">

            {/* HERO SECTION */}
            <div className="relative h-[420px] w-full overflow-hidden">
                <img
                    src="/img6.jpg"
                    alt="Login Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex items-center px-6 md:px-24">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-4xl md:text-6xl mt-20 font-bold mb-4">
                            WELCOME BACK
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-200">
                            Secure access to your dashboard, orders, and account.
                        </p>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="px-4 py-14 md:px-32 bg-white">
                <div className="max-w-5xl mx-auto">

                    {/* HEADER */}
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold mb-2">
                            LOGIN TO YOUR ACCOUNT
                        </h2>

                        <h3 className="text-3xl text-[#d6226a] font-semibold mb-4">
                            LET’S GET YOU BACK IN.
                        </h3>

                        <p className="text-gray-700 leading-7">
                            Access your personalized dashboard, view your orders,
                            and continue where you left off.
                        </p>
                    </div>

                    {/* LOGIN CARD */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-10">

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* EMAIL */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    Email Address
                                </label>

                                <input
                                    {...register("email")}
                                    placeholder="Enter email"
                                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#d6226a]"
                                />

                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="block mb-2 font-medium">
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        placeholder="Enter password"
                                        className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#d6226a]"
                                    />

                                    <div className="text-right mt-2">
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-[#d6226a] hover:underline"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-lg"
                            >
                                LOGIN
                            </button>
                        </form>

                        {/* DIVIDER */}
                        <div className="flex items-center gap-4 my-8">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-sm text-gray-500">
                                OR CONTINUE WITH
                            </span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* GOOGLE */}
                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={handleGoogle}
                                onError={() => console.log("Google login failed")}
                            />
                        </div>

                        {/* FOOTER */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-700">
                                Don’t have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-[#d6226a] font-semibold hover:underline"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
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