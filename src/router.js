import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Page from "./pages/Page";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<Navbar />}>
          <Route index element={<Home />}/>
          <Route path="/page" element={<Page />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}