import React, { useState } from "react";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClearForm = () => {
    setSignupData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Signup Data:", signupData);

    setTimeout(() => {
      setIsLoading(false);
      handleClearForm();
    }, );
  };

  return (
    <>
      <div className="text-center mt-30 border-amber-200 border-2 w-75 ms-50 h-120 rounded-3xl">
        <h1>Sign Up</h1>

        <div className="container mt-4">
          <form onSubmit={handleSubmit} onReset={handleClearForm}>
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="name" className="w-32 font-bold">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={signupData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="username" className="w-32 font-bold">Username :</label>
              <input
                type="text"
                id="username"
                name="username"
                value={signupData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="email" className="w-32 font-bold">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="password" className="w-32 font-bold">Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="confirmPassword" className="w-32 font-bold">Confirm Password :</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex mt-6 justify-center gap-20">
              <button type="reset" className="bg-red-600 text-white px-4 py-2 rounded ">
                Clear
              </button>

              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded ">
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default Signup;