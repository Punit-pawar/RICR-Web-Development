import React from "react";
import Header from "./components/Header";
import Currency from "./components/Currency";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Header />
      <Currency />
    </>
  );
};

export default App;