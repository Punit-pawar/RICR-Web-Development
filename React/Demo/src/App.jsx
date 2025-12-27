import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./assets/component/Herader";
import Footer from "./assets/component/Footer";
import Home from "./assets/pages/Home";
import Product from "./assets/pages/Product";
import Contact from "./assets/pages/Contact";
import { BrowserRouter, Route , Routes} from "react-router-dom";
import About from "./assets/pages/About";





function App(){
  return(
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Product" element={<Product/>}/>
          <Route path="/Contact" element={<Contact/>}/>

          

        </Routes>



      <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;