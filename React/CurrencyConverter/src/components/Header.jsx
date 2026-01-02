import React from "react";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { HiCurrencyRupee } from "react-icons/hi2";
import { HiMiniCurrencyEuro } from "react-icons/hi2";
import { HiMiniCurrencyPound } from "react-icons/hi2";

const Header = () => {
  return (
    <>
      <div className="bg-blue-500 px-4 py-2 text-3xl text-white text-center flex justify-center items-center gap-4">
        <HiCurrencyRupee className="animate-bounce" />
        <HiMiniCurrencyDollar className="animate-spin"/>
        <span className="font-bold">Currency Convertor</span>
        <HiMiniCurrencyEuro className="animate-pulse"/>
        <HiMiniCurrencyPound className="animate-ping"/>
      </div>
    </>
  );
};

export default Header;