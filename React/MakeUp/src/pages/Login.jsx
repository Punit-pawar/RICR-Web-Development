import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

  

const Login = () => {
    const [loginData , setloginData] = useState ({
        username: "",
        password: "",
    });

  const handleChange = (e) => {
    const { name, value } = e.traget;
    setContactData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleclearform = () => {
        setloginData({
            username: "",
            password: "",
        })
  };

  const handlesubmitform = async (event) => {
    event.preventDefalut();
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      setTimeout(() => {
        const data = {
          username,
          password,
        };
        console.log(data);
      });
    } 

    catch (error) {
      console.log(error.message);
    } 
    handleclearform();
    
  };  

  return (
    <>

    <div>

        <div>
            <div className="border" >
                <h1 className="text-center">Login</h1>

                <form>
                    <div className="text-center">
                        <div>
                            <label htmlFor="username">UserName :</label>
                            <input 
                            type="text"
                            name="username"
                            id="username"
                            value={LoginData.username}
                            onChange={handleChange}
                            placeholder="Enter the Name"
                            className="text-black border rounded"
                            required
                            />
                        </div> 

                        <div>
                            <label htmlFor="password">Password :</label>
                            <input 
                            type="password"
                            name="password"
                            id="password"
                            value={LoginData.password}
                            onChange={handleChange}
                            placeholder="Enter the Name"
                            className="text-black border rounded"
                            required
                            />
                        </div> 

                        <div className="container mt-6 flex justify-center gap-15">
                            
                            <button type="reset" className="btn btn-danger">
                                Clear Form
                            </button>

                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
      
    </>
  );
};

export default Login;
