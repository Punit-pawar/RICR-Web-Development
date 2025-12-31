import React, { useState } from "react";

const Contact = () => {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    subject: "",
    message: "",
    religion: "",
    gender: "",
    skill: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let temp = contactData.skill;
      if (checked) {
        temp.push(value);
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      } else {
        temp = Object.values(temp); //Convert to Array
        temp = temp.filter((word) => word !== value); //Remove the Undersired Value
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      }
    } else {
      setContactData((previousData) => ({ ...previousData, [name]: value }));
    }
  };

  const handleClearForm = () => {
    setContactData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      subject: "",
      message: "",
      religion: "",
      gender: "",
      skill: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(contactData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    handleClearForm();
  };

  return (
    <>
      <div className="text-center mt-30 w-75 ms-50 border-2 h-70 rounded-3xl">
        <h1>Contact Us</h1>

        <div className="container mt-4">
          <form onReset={handleClearForm} onSubmit={handleSubmit}>
            <div className="flex items-center mb-4">
              <label htmlFor="fullName" className="w-28 font-bold">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={contactData.fullName}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="flex-1 border-2 border-black p-2 rounded "
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="email" className="w-28 font-bold">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={contactData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="phone" className="w-28 font-bold">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={contactData.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="city" className="w-28 font-bold">City</label>
              <input
                type="text"
                name="city"
                id="city"
                value={contactData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="subject" className="w-28 font-bold">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={contactData.subject}
                onChange={handleChange}
                placeholder="Enter your subject"
                className="flex-1 border-2 border-black p-2 rounded"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="religion" className="w-28 font-bold">Religion</label>
              <select
                name="religion"
                id="religion"
                onChange={handleChange}
                value={contactData.religion}
              >
                <option value="">--Select Religion--</option>
                <option value="islam">Islam</option>
                <option value="hinduism">Hinduism</option>
                <option value="christianity">Christianity</option>
                <option value="buddhism">Buddhism</option>
                <option value="jainism">Jainism</option>
                <option value="sikhism">Sikhism</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="gender" className="w-28 font-bold">Gender</label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleChange}
                checked={contactData.gender === "male"}
              />{" "}
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
                checked={contactData.gender === "female"}
              />{" "}
              Female
              <input
                type="radio"
                name="gender"
                value="other"
                onChange={handleChange}
                checked={contactData.gender === "other"}
              />{" "}
              Other
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="skill">Skill known</label>
              <input
                type="checkbox"
                name="skill"
                value="html"
                onChange={handleChange}
                checked={
                  Object.values(contactData.skill).find(
                    (word) => word === "html"
                  )
                    ? true
                    : false
                }
              />{" "}
              HTML
              <input
                type="checkbox"
                name="skill"
                value="css"
                onChange={handleChange}
                checked={
                  Object.values(contactData.skill).find(
                    (word) => word === "css"
                  )
                    ? true
                    : false
                }
              />{" "}
              CSS
              <input
                type="checkbox"
                name="skill"
                value="js"
                onChange={handleChange}
                checked={
                  Object.values(contactData.skill).find(
                    (word) => word === "js"
                  )
                    ? true
                    : false
                }
              />{" "}
              JS
              <input
                type="checkbox"
                name="skill"
                value="react"
                onChange={handleChange}
                checked={
                  Object.values(contactData.skill).includes("react")
                }
              />{" "}
              React
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="message" className="w-28 font-bold">Message</label>
              <textarea
                name="message"
                id="message"
                value={contactData.message}
                onChange={handleChange}
                placeholder="Enter your Message"
                className="flex-1 border-2 border-black p-2 rounded"
              ></textarea>
            </div>

            <div className="flex mt-6 justify-center gap-20">

              <button type="reset" className="btn btn-danger">
                Clear Form
              </button>
              <button type="submit" className="btn btn-success">
                {isLoading ? "Loading" : "Submit"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;