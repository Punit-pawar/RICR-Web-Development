import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

const Contact = () => {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [isloading, setisloading] = useState(false);

  const handleclearform = () => {
    setfullname("");
    setmessage("");
    setemail("");
  };

  const handlesubmitform =async (e) => {
    isloading(true);
    e.preventDefalut();

    try {
        const response = await fetch("https://fakestoreapi.com/products");
      setTimeout(() => {
        const data = {
          fullname,
          email,
          message,
        };
        console.log(data);
      }, 5000);
    } 

    catch (error) {
      console.log(error.message);
    } 

    finally {
      setisloading(false);
    }

    handleclearform();
  };

  return (
    <>
      <div className="text-center">
        <h1>Contact Us</h1>

        <div className="container flex justify-center">
          <form onReset={handleclearform} onSubmit={handlesubmitform}>
            <div>
              <label htmlFor="fullname">Full Name: </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={fullname}
                onChange={(e) => setfullname(e.target.value)}
                placeholder="Enter the Name"
                className="text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter the Email"
                className="text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="message">Message: </label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
                placeholder="Enter the message"
                className="text-black"
                required
              ></textarea>
            </div>

            <div>
              <button type="reset" className="btn btn-danger">Clear Form</button>

              <button type="submit" className="btn btn-success">{isloading?"loading":"submit"}</button>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
