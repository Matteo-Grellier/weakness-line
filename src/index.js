import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Page from "./pages/Page";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<Navbar />}>
          <Route index element={<Home />}/>
          <Route path="/page" element={<Page />} />
        </Route>
      </Routes>
    </HashRouter>
  </>
);
