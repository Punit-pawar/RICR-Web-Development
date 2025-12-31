import React, { useState } from 'react'
import Toaster, { toast } from "react-hot-toast";

const App = () => {

const [AppData, setAppData] = useState({
    name: "",
    email: "",
    number: "",
    dob: "",
    Qualification: "",
    Percentage: "",
    Courses: "",
    Timing: "",
    Batch: [],
    Address: "",
    City: "",
    pincode: "",
    fathername: "",    
    fathernumber: "", 
    aboutus: "",    
    Requirements: "", 
  });

  const [isLoading, setIsLoading] = useState(false);

  const [validationerror, setvalidationerror] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let temp = AppData.skill;
      if (checked) {
        temp.push(value);
        setAppData((previousData) => ({ ...previousData, [name]: temp }));
      } 
      else {
        temp = Object.values(temp); 
        temp = temp.filter((word) => word !== value); 
        setAppData((previousData) => ({ ...previousData, [name]: temp }));
      }
    } 
    else {
      setAppData((previousData) => ({ ...previousData, [name]: value }));
    }
  };

  const handleClearForm = () => {
    setAppData({
      name: "",
      email: "",
      number: "",
      dob: "",
      Qualification: "",
      Percentage: "",
      Courses: "",
      Timing: "",
      Batch: [],
      Address: "",
      City: "",    
      pincode: "", 
      fathername: "",    
      fathernumber: "", 
      aboutus: "",    
      Requirements: "", 
    });
  };

  const validate = () => {
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(!validate())
    {
      setIsLoading(false);
      return;
    }

    try 
    {
      console.log(AppData);
      toast.success("Registration Successfull")
    } 

    catch (error) 
    {
      console.log(error);
      toast.error(error.message);

    } 

    finally 
    {
      setIsLoading(false);
    }

  };

  return (
    <>

    <Toaster position="top-right" reverseOrder={true}/>

    <div>

      <div>
        <h1 className='text-6xl text-center text-blue-600'>
          Registration Form
        </h1>
      </div>

      <form onReset={handleClearForm} onSubmit={handleSubmit}>

      <div className="text-center mt-10 ms-10 me-19 h-80 rounded-3xl border bg-gray-200">
        <h1 className='text-3xl'>Peronal Information</h1>
        <div className="container mt-4  text-left">
             
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="name" className="w-32 font-bold">Full Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={AppData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="email" className="w-32 font-bold">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={AppData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="password" className="w-32 font-bold">Mobile :</label>
              <input
                type="number"
                id="number"
                name="number"
                value={AppData.number}
                onChange={handleChange}
                placeholder="Enter number"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="dob" className="w-32 font-bold">D.O.B :</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={AppData.dob}
                onChange={handleChange}
                placeholder="Confirm Date of birth"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-50 rounded-3xl border bg-gray-200">
        <h1 className='text-3xl'>Academic Details</h1>

        <div className="container mt-4  text-left">


            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="Qualification" className="w-32 font-bold">Qualification :</label>
              <select name="Qualification" id='Qualification' className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white" 
                onChange={handleChange}
                value={AppData.Qualification}>
                <option value="">--Select Qualification--</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="under graduate">Under Graduate</option>
                <option value="passout">PassOut</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="Percentage" className="w-32 font-bold">Percentage / Grade :</label>
              <input
                type="text"
                id="Percentage"
                name="Percentage"
                value={AppData.Percentage}
                onChange={handleChange}
                placeholder="Enter Percentage"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-85 rounded-3xl border bg-gray-200">
        <h1 className='text-3xl'>Course information</h1>
        <div className="container mt-4  text-left">
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="Courses" className="w-32 font-bold">Available Courses :</label>
              <select name="Courses" id='Courses' className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
                onChange={handleChange}
                value={AppData.Courses}>
                <option value="">--Select Courses--</option>
                <option value="10full stacl developmentth">Full Stack Development</option>
                <option value="data science">Data Science</option>
                <option value="data analytics">Data Analytics</option>
                <option value="java DSA">java DSA</option>
                <option value="python dsa">python DSA</option>
              </select>
            </div>


            <div className="flex items-center mb-4">
              <label htmlFor="Batch" className="w-28 font-bold">Prefered Batch:</label>
              <div className="flex-1 gap-10 ms-8 p-2 ">
                <div>
                  <input
                  type="checkbox"
                  name="Batch"
                  value="Morning"
                  onChange={handleChange}
                  checked={
                    Object.values(AppData.Batch).find(
                      (word) => word === "Morning"
                    )
                      ? true
                      : false
                  }
                  />{" "}
                  Morning
                </div>
                <div>
                  <input
                  type="checkbox"
                  name="Batch"
                  value="Afternoon"
                  onChange={handleChange}
                  checked={
                    Object.values(AppData.Batch).find(
                      (word) => word === "Afternoon"
                    )
                      ? true
                      : false
                  }
                  />{" "}
                  Afternoon
                </div>
               <div>
                 <input
                  type="checkbox"
                  name="Batch"
                  value="Evening"
                  onChange={handleChange}
                  checked={
                    Object.values(AppData.Batch).find(
                      (word) => word === "Evening"
                    )
                      ? true
                      : false
                  }
                  />{" "}
                  Evening
               </div>
               <div>
                 <input
                  type="checkbox"
                  name="Batch"
                  value="Weekend"
                  onChange={handleChange}
                  checked={
                    Object.values(AppData.Batch).find(
                      (word) => word === "Weekend"
                    )
                      ? true
                      : false
                  }
                  />{" "}
                  Weekend
               </div>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="Timing" className="w-28 font-bold">Prefered Batch Timing:</label>
              <div className="flex-1 gap-10 ms-8 p-2 ">
                <div>
                  <input
                  type="radio"
                  name="Timing"
                  value="7:00 AM - 10:00 AM"
                  onChange={handleChange}
                  checked={AppData.Timing === "7:00 AM - 10:00 AM"}
                  />
                  7:00 AM - 10:00 AM
                </div>
                <div>
                  <input
                  type="radio"
                  name="Timing"
                  value="12:00 PM - 3:00 PM"
                  onChange={handleChange}
                  checked={AppData.Timing === "12:00 PM - 3:00 PM"}
                  />
                  12:00 PM - 3:00 PM
                </div>
               <div>
                 <input
                  type="radio"
                  name="Timing"
                  value="6:30 PM - 9:00 PM"
                  onChange={handleChange}
                  checked={AppData.Timing === "6:30 PM - 9:00 PM"}
                  />
                  6:30 PM - 9:00 PM
               </div>
              </div>
            </div>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-60 rounded-3xl border bg-gray-200">
        <h1 className='text-3xl'>Address</h1>
        <div className="container mt-4  text-left">
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="Address" className="w-32 font-bold">Residential Address :</label>
              <input
                type="text"
                id="Address"
                name="Address"
                value={AppData.Address}
                onChange={handleChange}
                placeholder="Enter your Address"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="City" className="w-32 font-bold">City:</label>
              <input
                type="text"
                id="City"
                name="City"
                value={AppData.City}
                onChange={handleChange}
                placeholder="Enter City"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="pincode" className="w-32 font-bold">Pin Code :</label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={AppData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-50 rounded-3xl border bg-gray-200">
        <h1 className='text-3xl'>Guardian Details</h1>
        <div className="container mt-4  text-left">
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="fathername" className="w-32 font-bold">Guardian's Full Name:</label>
              <input
                type="text"
                id="fathername"
                name="fathername"
                value={AppData.fathername}
                onChange={handleChange}
                placeholder="Enter father name"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="fathernumber" className="w-32 font-bold">Guardian's Contact Numbe :</label>
              <input
                type="number"
                id="fathernumber"
                name="fathernumber"
                value={AppData.fathernumber}
                onChange={handleChange}
                placeholder="Enter father number"
                className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              />
            </div>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-50 rounded-3xl border bg-gray-200">
        <h1 className='text-3xl'>Additional Information</h1>
        <div className="container mt-4  text-left">
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="aboutus" className="w-32 font-bold">How did you hear about us? :</label>
              <select name="aboutus" id='aboutus' className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
                onChange={handleChange}
                value={AppData.aboutus}>
                <option value="">--Select--</option>
                <option value="friend">Friend</option>
                <option value="OnlineAD">Online AD</option>
                <option value="Newspaper">Newspaper</option>
                <option value="social media">Social Media</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="Requirements" className="w-32 font-bold">Special Requirements :</label>
              <textarea name="Requirements" id="Requirements"className="flex-1 border-2 border-black p-2 rounded-3xl focus:outline-none focus:border-indigo-500 bg-white"
              value={AppData.Requirements}
                onChange={handleChange}>
              </textarea>
            </div>
        </div>
      </div>

      <div className='flex mt-6 justify-center gap-20 mb-10'>
        <button type="reset" className="border text-white w-30 h-10 rounded-2xl  bg-red-600">
          Clear Form
        </button>
        <button type="submit" className="border text-white w-30 rounded-2xl bg-green-600">
            {isLoading ? "Loading" : "Submit"}
        </button>
      </div>
      </form>
    </div>
    
    </>
  )
}

export default App;