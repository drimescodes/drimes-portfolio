
import React,{useState,useEffect} from 'react';


import {About, Home, Experience, Projects, Contact} from './pages';
import {Navbar, Loading, Footer} from './components';
import { Routes, Route } from "react-router";

function App() {
const [isLoading,setIsLoading]=useState(true);
useEffect(() => {
  // Simulating a 1-second delay before loading the main page
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  return () => clearTimeout(timer); // Clear the timer when the component is unmounted
}, []);
  return (
    <div className=" bg-[#1d1d20] px-10 overflow-hidden min-h-[100svh]">
    {isLoading ? (
      <Loading />
    ) : (
      
      <>
    <header className=" ">
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/aboutme" element={<About/>} />


      </Routes>
      </header>
<Routes>
<Route path="/experience" element={<Experience/>} />
<Route path="/projects" element={<Projects/>} />
<Route path='/contact'  element = {<Contact />} />


</Routes>
        <Footer/>
       
      </>
      
    )}
  </div>
  );
}

  {/* <header className=" min-h-screen">
          <Navbar />
          <About />
        </header>
        </Route>
        <Introduction />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer /> */}

export default App;
