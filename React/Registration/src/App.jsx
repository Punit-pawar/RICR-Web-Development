import React from 'react'


const App = () => {
  return (
    <>

    <div className="text-center mt-30 ms-10 me-19 h-80 rounded-3xl border">
        <h1 className='text-3xl'>Peronal Information</h1>
        <div className="container mt-4  text-left">
          <form>
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="name" className="w-32 font-bold">Full Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="email" className="w-32 font-bold">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="password" className="w-32 font-bold">Mobile :</label>
              <input
                type="number"
                id="number"
                name="number"
                placeholder="Enter number"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="dob" className="w-32 font-bold">D.O.B :</label>
              <input
                type="date"
                id="dob"
                name="dob"
                placeholder="Confirm Date of birth"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-50 rounded-3xl border">
        <h1 className='text-3xl'>Academic Details</h1>

        <div className="container mt-4  text-left">

          <form>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="Qualification" className="w-32 font-bold">Qualification :</label>
              <select name="Qualification" id='Qualification' className="flex-1 border-2 border-black p-2 rounded">
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
                placeholder="Enter Percentage"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-85 rounded-3xl border">
        <h1 className='text-3xl'>Course information</h1>
        <div className="container mt-4  text-left">
          <form>
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="Courses" className="w-32 font-bold">Available Courses :</label>
              <select name="Courses" id='Courses' className="flex-1 border-2 border-black p-2 rounded">
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
                  value="7:00 AM - 10:00 AM"
                  />
                  Morning
                </div>
                <div>
                  <input
                  type="checkbox"
                  name="Batch"
                  value="12:00 PM - 3:00 PM"
                  />
                  Afternoon
                </div>
               <div>
                 <input
                  type="checkbox"
                  name="Batch"
                  value="6:30 PM - 9:00 PM"
                  />
                  Evening
               </div>
               <div>
                 <input
                  type="checkbox"
                  name="Batch"
                  value="6:30 PM - 9:00 PM"
                  />
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
                  />
                  7:00 AM - 10:00 AM
                </div>
                <div>
                  <input
                  type="radio"
                  name="Timing"
                  value="12:00 PM - 3:00 PM"
                  />
                  12:00 PM - 3:00 PM
                </div>
               <div>
                 <input
                  type="radio"
                  name="Timing"
                  value="6:30 PM - 9:00 PM"
                  />
                  6:30 PM - 9:00 PM
               </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-60 rounded-3xl border">
        <h1 className='text-3xl'>Address</h1>
        <div className="container mt-4  text-left">
          <form>
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="Address" className="w-32 font-bold">Residential Address :</label>
              <input
                type="text"
                id="Address"
                name="Address"
                placeholder="Enter your Address"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="City" className="w-32 font-bold">City:</label>
              <input
                type="text"
                id="City"
                name="City"
                placeholder="Enter City"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="pincode" className="w-32 font-bold">Pin Code :</label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                placeholder="Enter pincode"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-50 rounded-3xl border">
        <h1 className='text-3xl'>Guardian Details</h1>
        <div className="container mt-4  text-left">
          <form>
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="fathername" className="w-32 font-bold">Guardian's Full Name:</label>
              <input
                type="text"
                id="fathername"
                name="fathername"
                placeholder="Enter father name"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="fathernumber" className="w-32 font-bold">Guardian's Contact Numbe :</label>
              <input
                type="number"
                id="fathernumber"
                name="fathernumber"
                placeholder="Enter father number"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mt-10 ms-10 me-19 h-50 rounded-3xl border">
        <h1 className='text-3xl'>Additional Information</h1>
        <div className="container mt-4  text-left">
          <form>
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="aboutus" className="w-32 font-bold">How did you hear about us? :</label>
              <select name="aboutus" id='aboutus' className="flex-1 border-2 border-black p-2 rounded">
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
              <textarea name="Requirements" id="Requirements"className="flex-1 border-2 border-black p-2 rounded">
              </textarea>
            </div>
          </form>
        </div>
      </div>
    
    </>
  )
}

export default App