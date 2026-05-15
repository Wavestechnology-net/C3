import { startTransition, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useGoogleLoginMutation, useRegisterMutation } from "../services/apis/authApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSuccess } from "../services/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

const schema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
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
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    // 🧠 REGISTER HANDLER
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

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    // 🌐 GOOGLE LOGIN
    const handleGoogle = async (credentialResponse: any) => {
        try {
            const res = await googleLogin({
                idToken: credentialResponse.credential,
            }).unwrap();

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

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const styles: Record<string, React.CSSProperties> = {
        page: {
            display: "flex",
            minHeight: "100vh",
            fontFamily: "Inter",
        },

        imageSide: {
            flex: 1,
            backgroundImage: "url('/img3.jpg')",
            backgroundSize: "cover",
            position: "relative",
            display: "flex",
        },

        overlay: {
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
        },

        imageText: {
            position: "relative",
            color: "#fff",
            margin: "auto",
            // padding: 40,
            textAlign: "left"
        },

        logo: {
            width: 80,
            marginBottom: 20,
        },

        title: {
            fontSize: 52,
            fontWeight: 700,
        },

        subtitle: {
            fontSize: 20,
            opacity: 0.8,
        },

        formSide: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
        },

        card: {
            width: "100%",
            maxWidth: 420,
            background: "#fff",
            padding: 30,
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        },

        heading: {
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 20,
        },

        input: {
            width: "100%",
            padding: 12,
            marginBottom: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
        },

        button: {
            width: "100%",
            padding: 12,
            background: "#006911",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            marginTop: 10,
            cursor: "pointer",
        },

        eye: {
            position: "absolute",
            right: 10,
            top: 12,
            cursor: "pointer",
        },

        error: {
            color: "red",
            fontSize: 12,
            marginBottom: 5,
        },
    };

    return (
        <div style={styles.page}>

            {/* LEFT SIDE */}
            <div style={styles.imageSide}>
                <div style={styles.overlay}></div>

                <div
                    style={{
                        ...styles.imageText
                    }}
                >
                    <h1 style={styles.title}>Create Account</h1>
                    <p style={styles.subtitle}>
                        Join us and start managing your dashboard securely
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div style={styles.formSide}>
                <div style={styles.card}>
                    <h2 style={styles.heading}>Register</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <input
                            placeholder="Username"
                            {...register("username")}
                            style={styles.input}
                        />
                        {errors.username && (
                            <p style={styles.error}>{errors.username.message}</p>
                        )}

                        <input
                            placeholder="Email"
                            {...register("email")}
                            style={styles.input}
                        />
                        {errors.email && (
                            <p style={styles.error}>{errors.email.message}</p>
                        )}

                        {/* PASSWORD */}
                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password")}
                                style={styles.input}
                            />

                            <span
                                style={styles.eye}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        {errors.password && (
                            <p style={styles.error}>{errors.password.message}</p>
                        )}

                        <button style={styles.button}>Create Account</button>
                    </form>

                    {/* GOOGLE LOGIN */}
                    <div style={{ marginTop: 15 }}>
                        <GoogleLogin
                            onSuccess={handleGoogle}
                            onError={() => console.log("Google login failed")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}