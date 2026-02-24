import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineDesktopComputer } from "react-icons/hi";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[100svh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HiOutlineDesktopComputer className="text-[#cacaca] w-12 h-12" />
        </motion.div>
        <motion.div
          className="mt-5 h-1.5 bg-gray-200 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "10rem" }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    );
  }
  return null;
};

export default Loading;
