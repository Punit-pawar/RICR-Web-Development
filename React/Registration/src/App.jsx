import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registrationpage from '../pages/Registrationpage';
import { Link } from "react-router-dom";

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/Registrationpage" element={<Registrationpage/>} />
      <Link to={"/Registrationpage"} className="text-decoration-none text-black"> Registration page </Link>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App