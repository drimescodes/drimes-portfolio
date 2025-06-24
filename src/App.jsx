import React, { useState, useEffect } from "react";

import { About, Home, Experience, Projects, Contact } from "./pages";
import { Navbar, Loading, Footer } from "./components";
import { Routes, Route, useLocation } from "react-router";
import { PageProvider } from "./contexts/PageContext";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulating a 1-second delay before loading the main page
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer); // Clear the timer when the component is unmounted
  }, []);
  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant", // or "smooth"
  });
}, [location.pathname]);

  const [currentPage, setCurrentPage] = useState(0);
  const pages = ["/", "/aboutme", "/experience", "/projects", "/contact"];

  const navigateToPage = (page) => {
    const index = pages.indexOf(page);
    if (index !== -1) {
      setCurrentPage(index);
    }
  };
  return (

    <PageProvider>
    <div
  className={`${isHome ? "sm:h-screen" : "min-h-screen"} bg-[#1d1d20] px-8 flex flex-col overflow-hidden`}
>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          
            <Navbar />
            <main
              
            >
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutme" element={<About />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          </main>
          <Footer />
        </>
      )}
    </div>
    </PageProvider>
  );
}

{
  /* <header className=" min-h-screen">
          <Navbar />
          <About />
        </header>
        </Route>
        <Introduction />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer /> */
}

export default App;
