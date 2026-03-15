import { Link } from "react-router-dom";
import { usePage } from "../contexts/PageContext";
const Home = () => {
  const { setCurrentPage } = usePage();
  const handleLinkClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className=" flex flex-col justify-center mt-20 lg:mt-24 xl:mt-44 ">
      <div className="max-w-screen-lg mx-auto">
        <h3 className="text-[#54d5bb]">Hi, my name is</h3>
        <h1 className=" text-6xl py-2 text-[#cacaca] font-medium">Drimes</h1>
        <h3 className=" text-4xl py-2 text-[#8892b0]">Software Engineer</h3>
        <p className="text-lg py-5 leading-8 text-[#cacaca]">
          I build things across the stack, be it mobile apps, web platforms, APIs,
          browser extensions, automation bots and whatever else the problem calls for. Currently
          shipping production software with React Native, React/Next.js, FastAPI, and
          PostgreSQL.
        </p>
      </div>
      <div className="max-w-screen-lg mx-auto w-full text-5xl flex justify-start gap-8 pt-6 pb-8 ">
        <Link to={"/projects"}>
          <div
            className=" md:text-3xl sm:text-xl text-sm active:scale-95 inline-block rounded-lg px-4 py-2 text-teal-500 border border-teal-500 bg-transparent"
            onClick={() => {
              handleLinkClick(3);
              scrollToTop();
            }}
          >
            <span className="">Projects</span>
          </div>
        </Link>

        <Link to={"/contact"}>
          <div
            href="#contact"
            className=" md:text-3xl sm:text-xl text-sm active:scale-95 inline-block px-4 py-2 rounded-lg text-teal-500 border border-teal-500 bg-transparent"
            onClick={() => {
              handleLinkClick(4);
              scrollToTop();
            }}
          >
            <span className="">Contact Me!</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
