// import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Wrapper from "./components/Wrapper";
import About from "./routes/About";
import YouthAcademy from "./routes/Youth";
import Recreational from "./routes/Recreational";
import { ContactPage } from "./routes/Contact";
import Competitive from "./routes/Competitive";
import Tryouts from "./routes/Tryouts";
import News from "./routes/News";
import Events from "./routes/Events";
import { Media} from "./routes/Media";


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
        </Route>
          <Route path="/media" element={<Media />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
