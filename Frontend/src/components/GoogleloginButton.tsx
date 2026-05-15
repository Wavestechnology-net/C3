import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useGoogleLoginMutation } from "../services/apis/authApi";
import { loginSuccess } from "../services/authSlice";

export default function GoogleLoginButton() {
  const [googleLogin] = useGoogleLoginMutation();
  const dispatch = useDispatch();

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