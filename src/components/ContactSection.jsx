import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ContactSection = () => {
    const sectionRef = useRef(null);
    const circleRef = useRef(null);
    const initialTextRef = useRef(null);
    const finalTextRef = useRef(null);
    const formRef = useRef(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleContactClick = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        window.location.href = `mailto:leaadeliee77@gmail.com?subject=Message from ${formData.name}&body=${formData.message}%0D%0A%0D%0AReply to: ${formData.email}`;
        
        setFormData({
            name: '',
            email: '',
            message: ''
        });
        
        setShowForm(false);
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cleanup = () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.vars.trigger === sectionRef.current) {
                    st.kill(true);
                }
            });
        };

        cleanup();

        gsap.set(circleRef.current, { scale: 1, backgroundColor: "white" });
        gsap.set(initialTextRef.current, { opacity: 1 });
        gsap.set(finalTextRef.current, { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                invalidateOnRefresh: true,
            }
        });

        tl.to(circleRef.current, {
            scale: 5,
            backgroundColor: "#9333EA",
            ease: "power1.inOut",
            duration: 0.5,
        }, 0);

        tl.to(initialTextRef.current, {
            opacity: 0,
            ease: "power1.out",
            duration: 0.2,
        }, 0.1);

        tl.to(circleRef.current, {
            scale: 17,
            backgroundColor: "#E9D5FF",
            boxShadow: "0 0 50px 20px rgba(233, 213, 255, 0.3)",
            ease: "power2.inOut",
            duration: 0.5,
        }, 0.5);

        tl.to(finalTextRef.current, {
            opacity: 1,
            ease: "power2.in",
            duration: 0.2,
        }, 0.7);

        return cleanup;
    }, []);

    useEffect(() => {
        if (showForm) {
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 50, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [showForm]);

    return (
        <section
            ref={sectionRef}
            className="flex items-center justify-center bg-gradient-to-b from-[#1e0b36] to-[#2a0b42] relative"
            style={{ overscrollBehavior: "none", minHeight: "200vh" }}
            id="Contact"
        >
            <div
                ref={circleRef}
                className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex items-center justify-center relative transition-shadow duration-1000 shadow-violet-300/50 shadow-lg bg-gradient-to-r from-violet-400 to-pink-100"
            >
                <p
                    ref={initialTextRef}
                    className="text-black font-bold text-base sm:text-lg md:text-xl absolute inset-0 flex items-center text-center"
                >
                </p>

                <div
                    ref={finalTextRef}
                    className="text-center relative flex flex-col items-center justify-center opacity-0"
                >
                    <h1 className="text-black md:w-[10rem] w-[20rem] lg:scale-[0.4] sm:scale-[0.25] scale-[0.07] md:font-bold text-sm sm:text-base leading-none mb-5">
                        Step Into the Future with Leaaoo
                    </h1>

                    <p className="text-black lg:w-[40rem] w-[20rem] absolute sm:mt-3 mt-1 md:scale-[0.1] scale-[0.068]">
                        Let's create something amazing together
                    </p>

                    <button 
                        onClick={handleContactClick}
                        className="px-10 py-2 rounded-xl bg-black hover:bg-white hover:text-black transition-all duration-500 scale-[0.1] absolute sm:mt-9 mt-7 text-nowrap"
                    >
                        Contact Me
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div 
                        ref={formRef}
                        className="relative bg-gradient-to-br from-[#1e0b36] to-[#2a0b42] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-[#9333EA]/50"
                    >
                        <button 
                            onClick={handleCloseForm}
                            className="absolute top-4 right-4 text-[#E9D5FF] hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] to-[#FBCFE8]">
                            Get In Touch
                        </h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[#E9D5FF] mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 rounded-lg bg-[#1e0b36] border border-[#9333EA]/30 focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA] text-white transition-all"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#E9D5FF] mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-lg bg-[#1e0b36] border border-[#9333EA]/30 focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA] text-white transition-all"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-[#E9D5FF] mb-1">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-4 py-2 rounded-lg bg-[#1e0b36] border border-[#9333EA]/30 focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA] text-white transition-all"
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-gradient-to-r from-[#9333EA] to-[#C084FC] text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-[#9333EA]/30"
                            >
                                Send Message
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-center space-x-4">
                            <a 
                                href="https://github.com/leaadeliee999" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#E9D5FF] hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a 
                                href="https://instagram.com/deliee.a" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#E9D5FF] hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a 
                                href="https://linkedin.com/in/adeliatrimulyasari" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#E9D5FF] hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactSection;