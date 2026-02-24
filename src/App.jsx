import React, { useState, useEffect } from "react";

import { Thoughts, ThoughtDetail } from "./pages";
import { Navbar, Loading, Footer } from "./components";
import CubeSwipe from "./components/CubeSwipe";
import NotFound from "./pages/NotFound";
import { Routes, Route, useLocation } from "react-router";
import { PageProvider } from "./contexts/PageContext";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const mainPages = ["/", "/aboutme", "/experience", "/projects", "/contact"];
  const isMobileView = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobileView && mainPages.includes(location.pathname)) return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <PageProvider>
      <div
        className={`${isHome ? "sm:min-h-screen" : "min-h-screen"} bg-[#1d1d20] px-8 flex flex-col overflow-hidden`}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <main>
              <CubeSwipe
                nonMainPage={
                  <Routes>
                    <Route path="/thoughts" element={<Thoughts />} />
                    <Route path="/thoughts/:slug" element={<ThoughtDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                }
              />
            </main>
            <Footer />
          </>
        )}
      </div>
    </PageProvider>
  );
}

export default App;
