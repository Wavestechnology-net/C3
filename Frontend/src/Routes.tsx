// import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Wrapper from "./components/Wrapper";
import About from "./routes/About";
import YouthAcademy from "./routes/Youth";
import Recreational from "./routes/Recreational";
import { ContactPage } from "./routes/Contact";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/youth" element={<YouthAcademy />} />
          <Route path="/recreational" element={<Recreational />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
