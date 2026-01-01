import React, { useState } from "react";
import CountryData from "../assets/CountryData.json";

const Currency = () => {
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  console.log(CountryData);

  return (
    <>
      <div className="bg-amber-50 h-screen">

        <div className="w-3xl bg-white rounded shadow border p-3 mx-auto">

          <div className="grid grid-cols-2 gap-5">
            <div className="flex gap-3 border rounded p-3">
                {from && (
                    <img src={`https://flagsapi.com/${from.split(" ")[1]}/flat/64.png`} alt=""/>

                )}
                <select name="from" value={from} onChange={(e)=> setfrom(e.target.value)} className=" p-3 rounded overflow-hidden">
                <option value="">--Select Country--</option>
                {CountryData.map((country,idx)=>(
                        <option 
                        value={country.currencyCode+" "+country.currencyCode}
                        key={idx}
                        >
                            {country.countryName}
                        </option>
                    ))
                }
            </select>


            </div>

            <select name="to" value={to} onChange={(e)=> setto(e.target.value)} className="border p-3 rounded overflow-hidden">
              <option value="">--Select Country--</option>
              {
                CountryData.map((country,idx)=>(
                    <option 
                    value={country.currencyCode+" "+country.currencyCode}
                    key={idx}
                    >
                        {country.countryName}
                    </option>

                )
                )
              }
            </select>

          </div>

        </div>

      </div>
    </>
  );
};

export default Currency;
