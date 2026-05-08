// import React from "react";

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


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tryouts" element={<Tryouts />} />
          {/* <Route path="/news" element={<News/>} /> */}
          {/* <Route path="/events" element={<Events/>} /> */}
          {/* <Route path="/elite" element={<Elite />} /> */}
          <Route path="/youth" element={<YouthAcademy />} />
          <Route path="/recreational" element={<Recreational />} />
          <Route path="/competitive" element={<Competitive />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
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
