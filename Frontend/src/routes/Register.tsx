import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import {
    useGoogleLoginMutation,
    useRegisterMutation,
} from "../services/apis/authApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSuccess } from "../services/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const schema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);

    const [registerApi] = useRegisterMutation();
    const [googleLogin] = useGoogleLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // REGISTER
    const onSubmit = async (data: any) => {
        try {
            const res = await registerApi(data).unwrap();

            dispatch(
                loginSuccess({
                    token: res.token,
                    user: {
                        id: res.user.id,
                        username: res.user.username,
                        email: res.user.email,
                        role: res.user.role,
                    },
                    expiresAt: res.expiresAt,
                })
            );

            reset();
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    // GOOGLE LOGIN
    const handleGoogle = async (credentialResponse: any) => {
        try {
            const res = await googleLogin({
                idToken: credentialResponse.credential,
            }).unwrap();

            const data = res.token; // 👈 IMPORTANT FIX

            dispatch(
                loginSuccess({
                    token: data.token,
                    user: {
                        id: 0, // Google login does NOT return DB id
                        username: data.username,
                        email: data.email,
                        role: data.role,
                    },
                    expiresAt: new Date().toISOString(), // fallback
                })
            );

            navigate("/shop");
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
                    alt="Register Hero"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex items-center px-6 md:px-24">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-4xl md:text-6xl mt-20 font-bold mb-4">
                            CREATE ACCOUNT
                        </h1>

                        <p className="text-lg md:text-2xl text-gray-200">
                            Join us and start managing your dashboard securely.
                        </p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="px-4 py-14 md:px-32 bg-white">
                <div className="max-w-5xl mx-auto">
                    {/* HEADER */}
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold mb-2">
                            WELCOME TO OUR PLATFORM
                        </h2>

                        <h3 className="text-3xl text-[#d6226a] font-semibold mb-4">
                            LET’S GET YOU STARTED.
                        </h3>

                        <p className="text-gray-700 leading-7">
                            Create your account to access your personalized dashboard,
                            manage your profile, and securely explore all platform features.
                        </p>
                    </div>

                    {/* SUCCESS MESSAGE */}
                    {isSubmitSuccessful && (
                        <div className="mb-8 p-4 bg-green-100 text-green-800 border border-green-200 rounded-lg">
                            <strong>Success!</strong> Your account has been created
                            successfully.
                        </div>
                    )}

                    {/* REGISTER CARD */}
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* USER INFO */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* USERNAME */}
                                <div>
                                    <Label className="mb-2 block">Username</Label>

                                    <Input
                                        placeholder="Enter username"
                                        {...register("username")}
                                        className="h-12"
                                    />

                                    {errors.username && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.username.message}
                                        </p>
                                    )}
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <Label className="mb-2 block">Email Address</Label>

                                    <Input
                                        type="email"
                                        placeholder="Enter email"
                                        {...register("email")}
                                        className="h-12"
                                    />

                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <Label className="mb-2 block">Password</Label>

                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        {...register("password")}
                                        className="h-12 pr-12"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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

                            {/* SUBMIT */}
                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-6 text-base rounded-lg"
                                >
                                    Create Account
                                </Button>
                            </div>
                        </form>

                        {/* DIVIDER */}
                        <div className="flex items-center gap-4 my-8">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-sm text-gray-500">
                                OR CONTINUE WITH
                            </span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        {/* GOOGLE LOGIN */}
                        <div className="flex justify-center md:justify-start">
                            <GoogleLogin
                                onSuccess={handleGoogle}
                                onError={() =>
                                    console.log("Google login failed")
                                }
                            />
                        </div>

                        {/* LOGIN LINK */}
                        <div className="mt-8">
                            <p className="text-gray-700">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-[#d6226a] font-semibold hover:underline"
                                >
                                    Sign In
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