import React, { useState } from 'react'
import toast from "react-hot-toast";
import api from "../config/Api";
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const {setUser,setIslogin} = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });


  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login",formData)
      toast.success(res.data.message);
      setUser(res.data.data);
      setIslogin(true);
      sessionStorage.setItem("DinXUser",JSON.stringify(res.data.data));
      navigate("/UserDashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-6 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Login
            </h1>
            <p className="text-lg text-gray-600">
              Login your Account
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="p-8"
            >
              <div className="mb-10">
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full h-fit px-4 py-3 border-2
                     border-gray-300 rounded-lg focus:outline-none
                     focus:border-indigo-500 hover:border-indigo-300
                     transition duration-300 transform hover:scale-102 disabled:cursor-not-allowed
                     disabled:scale-100 disabled:bg-gray-200"/>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Create Password"
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full h-fit px-4 py-3 border-2
                     border-gray-300 rounded-lg focus:outline-none
                     focus:border-indigo-500 hover:border-indigo-300
                     transition duration-300 transform hover:scale-102 disabled:cursor-not-allowed
                     disabled:scale-100 disabled:bg-gray-200"/>
                </div>
              </div>

              <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
                
                <button
                  type="reset"
                  disabled={isLoading}
                  className="flex-1 bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-lg
                   hover:text-white hover:bg-gray-400 transition
                    duration-300 transform hover:scale-105 disabled:cursor-not-allowed
                     disabled:scale-100 disabled:bg-gray-300 disabled:text-white">
                  Clear Form
                </button>

                <button
                  type="Login"
                  disabled={isLoading}
                  className="flex-1 bg-linear-to-r from-indigo-600 to-indigo-700
                  text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-700
                  hover:to-indigo-800 transition duration-300 transform hover:scale-105
                    shadow-lg disabled:cursor-not-allowed disabled:scale-100 disabled:bg-indigo-600">
                  {isLoading?"LoggingIn":"Login"}
                </button>

              </div>
            </form>
          </div>

          <p className="text-center text-gray-600 mt-8 text-sm">
            ALL FIELDS ARE MARKED MANDATORY. WE RESPECT YOUR PRIVACY.
          </p>
        </div>
      </div>

    </>
  )
}

export default Login