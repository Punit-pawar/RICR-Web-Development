import React, { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClearForm = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Login Data:", loginData);

    setTimeout(() => {
      setIsLoading(false);
      handleClearForm();
    }, 1000);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <div className="container ">
          <form onSubmit={handleSubmit} onReset={handleClearForm}>
            <div className="flex items-center mb-4">
              <label htmlFor="email" className="w-28 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="password" className="w-28 font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex mt-6">
              <button
                type="reset"
                className="bg-red-600 text-white px-4 py-2 rounded "
              >
                Clear
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded "
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;