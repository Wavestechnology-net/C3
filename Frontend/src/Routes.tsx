// import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Wrapper from "./components/Wrapper";
import About from "./routes/About";
import ContactUs from "./routes/Contact";
import Recreational from "./routes/Recreational";
import YouthAcademy from "./routes/Youth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/recreational" element={<Recreational />} />
          <Route path="/youth" element={<YouthAcademy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
