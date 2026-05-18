import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/dynamic/Home";
import Wrapper from "./components/Wrapper";
import About from "./routes/dynamic/About";
import YouthAcademy from "./routes/dynamic/Youth";
import Recreational from "./routes/dynamic/Recreational";
import { ContactPage } from "./routes/Contact";
import Competitive from "./routes/dynamic/Competitive";
import Tryouts from "./routes/Tryouts";
import Media from "./routes/admin/Media";
import PageNotFound from "./routes/PageNotFound";
import Login from "./routes/Login";
import ProtectedAdminRoute from "./routes/admin/ProtectedAdminRoute";
import Page from "./routes/admin/Page";
import AdminDashboard from "./routes/admin/AdminDashboard";
import { Shop } from "./routes/cart/shop";
import { Cart } from "./routes/cart/cart";
import { Success } from "./routes/cart/success";
import { CancelPage } from "./routes/cart/cancel";
import Register from "./routes/Register";
import UserDashboard from "./routes/admin/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import { useSelector } from "react-redux";
import type { RootState } from "./services/store";
import { useEffect } from "react";
import { isTokenExpired } from "./services/token";
import { logout } from "./services/authSlice";
import ForgotPassword from "./routes/ForgotPassword";
import ResetPassword from "./routes/ResetPassword";
import { useAppDispatch } from "./hooks/cart";


const App = () => {
  const dispatch = useAppDispatch();

  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      dispatch(logout());
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tryouts" element={<Tryouts />} />
          <Route path="/youth" element={<YouthAcademy />} />
          <Route path="/recreational" element={<Recreational />} />
          <Route path="/competitive" element={<Competitive />} />
          <Route path="/shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        </Route>


        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pages" element={<Page />} />
          <Route path="media" element={<Media />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
