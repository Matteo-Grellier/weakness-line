import React from 'react';
import './index.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Presentation from "./pages/Presentation";
import CreatePres from "./pages/CreatePresentation";
import "highlight.js/styles/github.css";

function App() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/presentation" element={<Presentation/>} />
                    <Route path="/createPresentation" element={<CreatePres/>} />
                </Routes>
            </HashRouter>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);