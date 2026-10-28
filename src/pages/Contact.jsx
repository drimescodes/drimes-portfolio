import React, { useState, useRef } from "react";

import emailjs from "@emailjs/browser";
import { VerificationModal, Spinner } from "../components";
const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [verification, setVerification] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true); 

    emailjs
      .sendForm(
        import.meta.env.VITE_VERCEL_EMAIL_SERVICE_ID,
        import.meta.env.VITE_VERCEL_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_VERCEL_EMAIL_API_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setVerification("Message Sent!, looking forward to connecting! 😁");
          setShowModal(true);
        },
        (error) => {
          console.log(error.text);
          console.log("message failed");
          setVerification("Message Failed to Send! 😢");
          setShowModal(true);
        }
      )
      .finally(() => {
        setLoading(false); 
        setEmail("");
        setName("");
        setMessage("");
        console.log(import.meta.env.VITE_VERCEL_EMAIL_SERVICE_ID);
        console.log(import.meta.env.VITE_VERCEL_EMAIL_TEMPLATE_ID);
        console.log(import.meta.env.VITE_VERCEL_EMAIL_API_KEY);

      });
  };



  const closeModal = () => {
    setShowModal(false);
    setVerification("");
  };


  return (
    <section className="min-h-screen mt-24">
      <div className="pt-2 pb-8 lg:pb-16 px-4 mx-auto max-w-screen-md relative">
        <h2 className="mb-4 text-3xl font-medium text-center text-gray-500">
          Contact
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-400 sm:text-xl">
          Please feel free to reach out with any questions or opportunities, and
          I will do my best to respond as soon as possible. I look forward to
          hearing from you!
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-8 ">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              required
              type="text"
              name="user_name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              required
              type="email"
              name="user_email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-700 border border-gray-600 text-white placeholder-gray-400 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              required
              name="message"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="block p-2.5 w-full text-sm text-white placeholder-gray-400 bg-gray-700 rounded-lg shadow-sm border border-gray-600 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <input
            type="submit"
            value="Send"
            className="cursor-pointer py-3 px-5 text-sm border border-teal-500 font-medium text-center text-white rounded-lg sm:w-fit focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </form>
        {loading && <Spinner />}
        {showModal && (
          <VerificationModal verification={verification} onClose={closeModal} />
        )}
      </div>
    </section>
  );
};

export default Contact;




// Testing purposes in dev mode
  // const sendEmail = (e) => {
  //   e.preventDefault();
  //   setLoading(true); // Set loading state to true when sending email
  
  //   // Simulate a delay using setTimeout
  //   setTimeout(() => {
  //     // Once the timeout is complete, set loading state to false
  //     setLoading(false);
  
  //     // You can then proceed to set the verification message and show the modal
  //     setVerification("Message Sent!, looking forward to connecting with you! 😁");
  //     setShowModal(true);
  
  //     // Clear input fields
  //     setEmail("");
  //     setName("");
  //     setMessage("");
  //   }, 5000); // Simulate a 2-second delay
  // };
