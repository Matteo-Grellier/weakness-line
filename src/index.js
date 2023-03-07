import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Presentation from "./pages/Presentation";
import CreatePres from "./pages/CreatePresentation";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<Navbar />}>
          <Route index element={<Home />}/>
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/createPresentation" element={<CreatePres />} />
          <Route path="/openPresentation" element={<p>open pressentation</p>} />
        </Route>
      </Routes>
    </HashRouter>
  </>
);
