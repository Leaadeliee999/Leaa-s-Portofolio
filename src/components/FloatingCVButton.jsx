import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

export default function FloatingCVButton() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[999]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <a
        href="/mycv.jpeg" // CHANGE THIS TO YOUR ACTUAL CV FILENAME
        download="Adelia_CV.jpeg" // CHANGE TO YOUR DESIRED DOWNLOAD NAME
        className="flex items-center gap-2 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label="Download CV"
      >
        <FaDownload className="text-xl" />
        <span className="hidden sm:inline-block font-medium">Download CV</span>
      </a>
    </motion.div>
  );
}