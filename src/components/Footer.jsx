import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi"

const Footer = () => {
    return (
        <footer className="bg-black text-white py-16 px-6 mt-40">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                    {/* Logo and description */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                            Leaaoo
                        </h2>
                        <p className="mt-2 text-gray-400 max-w-md">
                            Creating innovative digital experiences that make an impact.
                        </p>
                    </div>

                    {/* Connect links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold mb-4 text-purple-200">
                            Connect
                        </h3>
                        <div className="flex justify-center md:justify-start space-x-6">
                            <a 
                                href="https://github.com/leaadeliee999" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-violet-400 transition-colors"
                            >
                                <FiGithub className="w-6 h-6" />
                            </a>
                            <a 
                                href="https://linkedin.com/in/adeliatrimulyasari" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-violet-400 transition-colors"
                            >
                                <FiLinkedin className="w-6 h-6" />
                            </a>
                            <a 
                                href="https://instagram.com/deliee.a" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-violet-400 transition-colors"
                            >
                                <FiInstagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © 2025 Leaaoo. All right reserved.
                    </p>

                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a 
                            href="/privacy-policy" 
                            className="text-gray-500 hover:text-white text-sm transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a 
                            href="/terms-of-service" 
                            className="text-gray-500 hover:text-white text-sm transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a 
                            href="/cookie-policy" 
                            className="text-gray-500 hover:text-white text-sm transition-colors"
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer