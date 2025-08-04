import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link } from 'react-scroll';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { name: "Home", id: "Home" },
    { name: "About", id: "About" },
    { name: "Skills", id: "skills" }, 
    { name: "Projects", id: "Projects" },
    { name: "Contact", id: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const openContactForm = () => {
    setContactFormOpen(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.getElementById('name')?.focus();
    }, 100);
  };
  
  const closeContactForm = () => {
    setContactFormOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Message from ${formData.name}`;
    const body = `${formData.message}%0D%0A%0D%0AReply to: ${formData.email}`;
    window.location.href = `mailto:leaadeliee77@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormData({ name: '', email: '', message: '' });
    closeContactForm();
  };

  return (
    <>
      <header className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3 }}
            className="flex items-center"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
              A
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
              Portofolio
            </span>
          </motion.div>

          <nav className="lg:flex hidden space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className={`relative px-3 py-2 font-medium transition-colors duration-300 cursor-pointer ${
                    activeSection === item.id
                      ? 'text-violet-600 dark:text-violet-400'
                      : 'text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400'
                  }`}
                  activeClass="text-violet-600 dark:text-violet-400"
                  onSetActive={() => setActiveSection(item.id)}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-violet-600 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="md:flex hidden items-center space-x-4 ml-6">
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              href="https://github.com/leaadeliee999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            >
              <FiGithub className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              href="https://linkedin.com/in/adeliatrimulyasari"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            >
              <FiLinkedin className="w-5 h-5" />
            </motion.a>
            
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              href="https://instagram.com/deliee.a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            >
              <FiInstagram className="w-5 h-5" />
            </motion.a>

            <motion.button
              onClick={openContactForm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-t from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500 shadow-sm"
            >
              Hire Me
            </motion.button>
          </div>

          <div className="md:hidden flex items-center">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="text-gray-800 dark:text-gray-100 p-2"
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg"
            >
              <div className="px-6 py-5 space-y-5">
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.id}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${
                        activeSection === item.id
                          ? 'text-violet-600 dark:text-violet-400 bg-gray-100 dark:bg-gray-800'
                          : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-center space-x-6">
                    <a href="https://github.com/leaadeliee999" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400">
                      <FiGithub className="h-6 w-6" />
                    </a>
                    <a href="https://linkedin.com/in/adeliatrimulyasari" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400">
                      <FiLinkedin className="h-6 w-6" />
                    </a>
                    <a href="https://instagram.com/deliee.a" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400">
                      <FiInstagram className="h-6 w-6" />
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      toggleMenu();
                      openContactForm();
                    }}
                    className="mt-4 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Fixed Contact Form Modal */}
      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
            onClick={closeContactForm}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 400,
                duration: 0.3
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4 my-8 border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300">
                  Get In Touch
                </h2>
                <button 
                  onClick={closeContactForm}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-800 dark:text-gray-300" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-500/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 caret-violet-500"
                    placeholder="Your name"
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-500/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 caret-violet-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-500/30 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 caret-violet-500"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;