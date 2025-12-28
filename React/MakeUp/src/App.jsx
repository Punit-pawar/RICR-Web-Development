import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Header from "./component/Header";
import Footer from "./component/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/About" element={<About/>} />
          <Route path="/Product" element={<Product/>} />
          <Route path="/Contact" element={<Contact/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
