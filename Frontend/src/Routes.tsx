// import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Wrapper from "./components/Wrapper";
import About from "./routes/About";

import { ContactPage } from "./routes/Contact";
import Tryouts from "./routes/Tryouts";
import News from "./routes/News";
import Events from "./routes/Events";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tryouts" element={<Tryouts />} />
          <Route path="/news" element={<News/>} />
          <Route path="/events" element={<Events/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
