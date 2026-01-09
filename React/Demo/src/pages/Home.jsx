import React from "react";
import Galaxy from "../../Reactbit/Galaxy";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  return (
    <>
     <div className=">
       <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Galaxy mouseInteraction={false} />
      </div>
     </div>
    </>
  );
};

export default Home;
