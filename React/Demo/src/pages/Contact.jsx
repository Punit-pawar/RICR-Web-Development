import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

const Contact = () => {
  const [contactData, setContactData] = useState({
    fullname: "",
    email: "",
    phone: "",
    city: "",
    subject: "",
    message: "",
  });

  const [isloading, setisloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.traget;
    setContactData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleclearform = () => {
    
  };

  const handlesubmitform = async (e) => {
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
                value={contactData.fullname}
                onChange={handleChange}
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
                value={contactData.email}
                onChange={handleChange}
                placeholder="Enter the Email"
                className="text-black"
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={contactData.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
                className="text-primary"
              />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={contactData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="text-primary"
              />
            </div>

            <div>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={contactData.subject}
                onChange={handleChange}
                placeholder="Enter your subject"
                className="text-primary"
              />
            </div>

            <div>
              <label htmlFor="message">Message: </label>
              <textarea
                name="message"
                id="message"
                value={contactData.message}
                onChange={handleChange}
                placeholder="Enter the message"
                className="text-black"
                required
              ></textarea>
            </div>

            <div>
              <button type="reset" className="btn btn-danger">
                Clear Form
              </button>

              <button type="submit" className="btn btn-success">
                {isloading ? "loading" : "submit"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
