import { useState } from "react";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAuth } from "../hooks/cart";
import { useLoginMutation } from "../services/apis/authApi";
import { loginSuccess } from "../services/authSlice";

const schema = Yup.object({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
});

export default function AdminLogin() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [loginApi, { isLoading }] = useLoginMutation();
    const { isAuthenticated, user } = useAuth();
    const isMobile = window.innerWidth < 768;

    // Already logged in as admin
    if (isAuthenticated && user?.role === "Admin") {
        return <Navigate to="/admin" />;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: {
        email: string;
        password: string;
    }) => {
        try {
            const res = await loginApi(data).unwrap();

            // BLOCK NON-ADMIN USERS
            if (res.user.role !== "Admin") {
                toast.error("Access denied. Admins only.");
                return;
            }

            dispatch(
                loginSuccess({
                    token: res.token,
                    refreshToken: res.refreshToken,
                    user: res.user,
                    expiresAt: res.expiresAt,
                })
            );

            toast.success("Admin login successful");

            navigate("/admin");

        } catch (error) {
            toast.error("Invalid email or password");
        }
    };

    const styles: Record<string, React.CSSProperties> = {
        page: {
            minHeight: "100vh",
            display: "flex",
            background: "#0F172A",
            fontFamily: "Inter, sans-serif",
            flexDirection: isMobile ? "column" : "row",
        },

        imageSide: {
            flex: 1,
            backgroundImage: "url('/home-bg-hero.jpg')", // 🔁 CHANGE IMAGE HERE
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            minWidth: "800px",
            display: isMobile ? "none" : "block",
        },

        imageOverlay: {
            position: "absolute",
            inset: 0,
            background:
                "linear-gradient(135deg, rgba(15,23,42,0.2), rgba(15,23,42,0.3))",
        },

        imageText: {
            position: "absolute",
            bottom: "60px",
            left: "60px",
            color: "#fff",
            maxWidth: "450px",
        },

        imageTitle: {
            fontSize: "2.5rem",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "10px",
        },

        imageSubtitle: {
            fontSize: "1.1rem",
            opacity: 0.9,
        },

        formSide: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F1F5F9",
            padding: isMobile ? "20px" : "40px",
        },

        card: {
            width: "100%",
            maxWidth: isMobile ? "100%" : "420px",
            background: "#fdc700",
            padding: isMobile ? "28px" : "40px",
            borderRadius: "20px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
            color: "#000",
        },

        title: {
            fontSize: isMobile ? "1.6rem" : "2rem",
            fontWeight: 800,
            marginBottom: "6px",
            textAlign: "center",
        },

        subtitle: {
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "0.95rem",
            opacity: 0.8,
        },

        label: {
            display: "block",
            fontSize: "0.85rem",
            fontWeight: 600,
            marginBottom: "6px",
        },

        input: {
            width: "100%",
            padding: "12px 14px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            fontSize: "0.95rem",
            marginBottom: "6px",
        },

        error: {
            fontSize: "0.75rem",
            color: "#7f1d1d",
            marginBottom: "10px",
        },

        button: {
            width: "100%",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "#0F172A",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "10px",
            transition: "all 0.3s ease",
        },

        footer: {
            textAlign: "center",
            marginTop: "18px",
            fontSize: "0.75rem",
            opacity: 0.7,
        },
        eyeIcon: {
            position: "absolute",
            right: "-10px",
            top: "60%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#334155",
        },
    };

    return (
        <div style={styles.page}>
            {/* Left Image Section */}
            <div style={styles.imageSide}>
                <div style={styles.imageOverlay}></div>
                <div style={styles.imageText}>
                    <h1 style={styles.imageTitle}>Admin Control Panel</h1>
                    <p style={styles.imageSubtitle}>
                        Manage content, media, and site sections securely from one place.
                    </p>
                </div>
            </div>

            {/* Right Login Form */}
            <div style={styles.formSide}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Welcome Back</h2>
                    <p style={styles.subtitle}>Sign in to continue</p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        {/* EMAIL */}
                        <div>
                            <label className="block mb-2 font-medium text-sm">
                                Email
                            </label>

                            <input
                                type="email"
                                {...register("email")}
                                placeholder="admin@email.com"
                                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block mb-2 font-medium text-sm">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="••••••••"
                                    className="w-full border rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-yellow-400"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
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
                            style={styles.button}
                            disabled={isLoading}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg transition"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                    <div style={styles.footer}>
                        © {new Date().getFullYear()} Nexus MedTech Admin
                    </div>
                </div>
            </div>
        </div>
    );
};
