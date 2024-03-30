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
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAIL_API_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setVerification("Message Sent!, looking forward to connecting!");
          setShowModal(true);
        },
        (error) => {
          console.log(error.text);
          console.log("message failed");
          setVerification("Message Failed to Send!");
          setShowModal(true);
        }
      )
      .finally(() => {
        setLoading(false); 
        setEmail("");
        setName("");
        setMessage("");
      });
  };



  const closeModal = () => {
    setShowModal(false);
    setVerification("");
  };


  return (
    <section className="min-h-screen mt-16 sm:mt-24 ">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md relative">
        <h2 className="mb-4 text-4xl tracking-tight font-medium text-center text-[#8892b0] dark:text-white">
          Contact
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Please feel free to reach out with any questions or opportunities, and
          I will do my best to respond as soon as possible. I look forward to
          hearing from you!
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-8 ">
          <div>
            <label className="block mb-2 text-sm font-medium text-[#8892b0] dark:text-gray-300">
              Name
            </label>
            <input
              required
              type="text"
              name="user_name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-[#8892b0] dark:text-gray-300">
              Email
            </label>
            <input
              required
              type="email"
              name="user_email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-[#8892b0] dark:text-gray-300">
              Message
            </label>
            <textarea
              required
              name="message"
              id="message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <input
            type="submit"
            value="Send"
            className="py-3 px-5 text-sm border border-teal-500 font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
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
