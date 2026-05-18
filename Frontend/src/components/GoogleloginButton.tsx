import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "../services/apis/authApi";
import { loginSuccess } from "../services/authSlice";
import { useAppDispatch } from "../hooks/cart";

export default function GoogleLoginButton() {
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useAppDispatch();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await googleLogin({
            idToken: credentialResponse.credential!,
          }).unwrap();

          dispatch(
            loginSuccess({
              token: res.token,
              refreshToken: res.refreshToken,
              user: res.user,
              expiresAt: res.expiresAt,
            })
          );
        } catch (err) {
          console.log("Google login failed", err);
        }
      }}
      onError={() => console.log("Google login error")}
    />
  );
}