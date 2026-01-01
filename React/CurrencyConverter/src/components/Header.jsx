import React from 'react'
import { HiCurrencyRupee } from 'react-icons/hi'
import { HiMiniCurrencyDollar } from 'react-icons/hi2'
import {HiMiniCurrencyEuro} from 'react-icons/hi2'
import {HiMiniCurrencyPound} from 'react-icons/hi2'


const Header = () => {
  return (
    <>
    <div className='bg-blue-500 px-4 py-2 text-white text-center flex justify-center items-center'>
        <HiCurrencyRupee/>
        <HiMiniCurrencyDollar/>
        <span className='text-3xl font-bold'>Currency Converter</span>
        <HiMiniCurrencyEuro/>
        <HiMiniCurrencyPound/>
    </div>
    
    </>
  )
}

export default Header;