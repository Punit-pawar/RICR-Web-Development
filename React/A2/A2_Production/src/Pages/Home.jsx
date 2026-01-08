import React from "react";
import ASCIIText from "../../Reactbits/ASCIIText";
import Antigravity from "../../Reactbits/Antigravity";
import ElectricBorder from "../../Reactbits/ElectricBorder";

const Home = () => {
  return (
    <>

    <div className=" bg-black h-screen">
      
      <div>
        <ASCIIText text="A2" enableWaves={false} asciiFontSize={9} textFontSize={40} textColor="gold"/>
      </div>

        <div className="flex justify-center gap-30 items-center h-screen">
        <ElectricBorder
            color="red"
            speed={0.6}
            chaos={0.2}
            thickness={0.1}
            style={{ borderRadius: 16 }}>
            <div class="max-w-sm rounded-2xl p-6 h-100 ">
            <h2 class="text-xl text-white font-semibold">Card Title</h2>
            <p class="mt-2 text-white">
                This is a simple Tailwind CSS card layout.
            </p>
            <div className=" flex justify-center items-center mt-55">
                <button class="mt-4 rounded-xl w-50 bg-white px-4 py-2 text-black hover:bg-indigo-700 hover:text-white transition ">
                view
                </button>
            </div>
            </div>
        </ElectricBorder>

        <ElectricBorder
            color="red"
            speed={0.6}
            chaos={0.2}
            thickness={0.1}
            style={{ borderRadius: 16 }}>
            <div class="max-w-sm rounded-2xl p-6 h-100">
            <h2 class="text-xl text-white font-semibold">Card Title</h2>
            <p class="mt-2 text-white">
                This is a simple Tailwind CSS card layout.
            </p>
            <div className=" flex justify-center items-center mt-55">
                <button class="mt-4 rounded-xl w-50 bg-white px-4 py-2 text-black hover:bg-indigo-700 hover:text-white transition ">
                view
                </button>
            </div>
            </div>
        </ElectricBorder>

        <ElectricBorder
          color="red"
          speed={0.6}
          chaos={0.2}
          thickness={0.1}
          style={{ borderRadius: 16 }}>
          <div class="max-w-sm rounded-2xl p-6 h-100">
            <h2 class="text-xl text-white font-semibold">Card Title</h2>
            <p class="mt-2 text-white">
              This is a simple Tailwind CSS card layout.
            </p>
            <div className=" flex justify-center items-center mt-55">
                <button class="mt-4 rounded-xl w-50 bg-white px-4 py-2 text-black hover:bg-indigo-700 hover:text-white transition">
                view
                </button>
            </div>
          </div>
        </ElectricBorder>
      </div>
     </div> 
    </>
  );
};

export default Home;
