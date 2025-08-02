import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const ProjectsSection = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const titleLineRef = useRef(null);
    const triggerRef = useRef(null);
    const horizontalRef = useRef(null);
    const magneticElements = useRef([]);

    const projectImages = [
        {
            id: 1,
            title: "Math Brain",
            imageSrc: "/images/project-1.png",
            description: "Game Matematika menyenangkan untuk anak Sekolah Dasar.",
            tags: ["React", "JavaScript", "CSS"],
            live: "#"
        },
        {
            id: 2,
            title: "Puff Go",
            imageSrc: "/images/project-2.png",
            description: "Game kasual seru! Terbangkan karaktermu melewati rintangan.",
            tags: ["React", "JavaScript", "CSS"],
            live: "#"
        },
        {
            id: 3,
            title: "Canvas Conquest",
            imageSrc: "/images/project-3.png",
            description: "Game Puzzle yang bertema lukisan estetik.",
            tags: ["React", "JavaScript", "CSS"],
            live: "#"
        }
    ];

    useEffect(() => {
        const elements = magneticElements.current;
        const strength = 30;
        
        const handleMouseMove = (e) => {
            const el = e.currentTarget;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = e.clientX - (left + width / 2);
            const y = e.clientY - (top + height / 2);
            
            gsap.to(el, {
                x: x / strength,
                y: y / strength,
                duration: 1,
                ease: "power2.out"
            });
        };
        
        const handleMouseOut = (e) => {
            const el = e.currentTarget;
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
        };

        elements.forEach((el) => {
            if (!el) return;
            el.addEventListener('mousemove', handleMouseMove);
            el.addEventListener('mouseout', handleMouseOut);
        });

        return () => {
            elements.forEach((el) => {
                if (!el) return;
                el.removeEventListener('mousemove', handleMouseMove);
                el.removeEventListener('mouseout', handleMouseOut);
            });
        };
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const titleChars = titleRef.current?.querySelectorAll('.char');
        
        gsap.from(titleChars, {
            y: 120,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(3)",
            stagger: 0.05,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            }
        });

        gsap.fromTo(titleLineRef.current, 
            { 
                width: "0%",
                opacity: 0,
                boxShadow: "0 0 0px rgba(192, 132, 252, 0)"
            },
            { 
                width: "100%",
                opacity: 1,
                boxShadow: "0 0 20px rgba(192, 132, 252, 0.8)",
                duration: 1.8,
                ease: "power4.out",
                delay: 0.3,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 50%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(triggerRef.current, 
            { 
                y: 100,
                opacity: 0,
                filter: "blur(10px)"
            },
            { 
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "top 30%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const horizontalScroll = gsap.to(".panel", {
                xPercent: -100 * (projectImages.length - 1),
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: () => `+=${horizontalRef.current.offsetWidth}`,
                    pin: true,
                    scrub: 1.5,
                    snap: {
                        snapTo: 1 / (projectImages.length - 1),
                        duration: { min: 0.3, max: 0.6 },
                        delay: 0.2,
                        ease: "power1.inOut"
                    },
                    invalidateOnRefresh: true
                }
            });

            const panels = gsap.utils.toArray(".panel");
            panels.forEach((panel) => {
                const image = panel.querySelector(".project-image");
                const content = panel.querySelector(".project-content");
                const tags = panel.querySelectorAll(".project-tag");
                const button = panel.querySelector(".project-button");
                
                gsap.fromTo(image, 
                    { 
                        x: 200,
                        opacity: 0,
                        scale: 0.9,
                        rotation: 5
                    },
                    { 
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: horizontalScroll,
                            start: "left right",
                            end: "right left",
                            scrub: true
                        }
                    }
                );
                
                gsap.fromTo(content, 
                    { 
                        opacity: 0,
                        y: 50
                    },
                    { 
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: horizontalScroll,
                            start: "left right",
                            end: "left center",
                            scrub: true
                        }
                    }
                );
                
                gsap.fromTo(tags, 
                    { 
                        opacity: 0,
                        y: 20
                    },
                    { 
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: horizontalScroll,
                            start: "left right",
                            end: "left center",
                            scrub: true
                        }
                    }
                );
                
                gsap.fromTo(button, 
                    { 
                        opacity: 0,
                        scale: 0.5
                    },
                    { 
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: horizontalScroll,
                            start: "left right",
                            end: "left center",
                            scrub: true
                        }
                    }
                );
            });
        });

        mm.add("(max-width: 1023px)", () => {
            gsap.to(".mobile-panel", {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".mobile-panel",
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            mm.revert();
        };
    }, []);

    const renderAnimatedTitle = (text) => {
        return text.split('').map((char, i) => (
            <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
        ));
    };

    return (
        <motion.section
            ref={sectionRef}
            id="Projects"
            className="relative py-20 lg:py-32 bg-gradient-to-b from-black to-purple-900 overflow-hidden"
            style={{ zIndex: 10 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -30px 0px" }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-purple-500"
                            style={{
                                width: Math.random() * 10 + 5 + 'px',
                                height: Math.random() * 10 + 5 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                            }}
                            animate={{
                                y: [0, (Math.random() - 0.5) * 100],
                                x: [0, (Math.random() - 0.5) * 50],
                                opacity: [0.1, 0.5, 0.1],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'linear'
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 mb-12 lg:mb-24 relative z-10">
                <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-center mb-4 lg:mb-6">
                    {renderAnimatedTitle("Recent Projects")}
                </h2>
                <div 
                    ref={titleLineRef} 
                    className="w-0 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 mx-auto rounded-full"
                />
            </div>

            <div ref={triggerRef} className="hidden lg:block relative overflow-hidden">
                <div 
                    ref={horizontalRef} 
                    className="horizontal-section flex w-[400%] lg:w-[300%]"
                >
                    {projectImages.map((project, index) => (
                        <div 
                            key={`desktop-${project.id}`}
                            className={`panel relative w-full h-screen flex items-center justify-center px-4 sm:px-8 ${
                                index % 2 === 0 ? 'bg-black/20' : 'bg-black/10'
                            }`}
                        >
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent z-10" />
                            </div>

                            <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-20">
                                <motion.div 
                                    className="project-image-wrapper relative rounded-3xl overflow-hidden shadow-2xl"
                                    whileHover={{ scale: 0.98 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    <img
                                        className="project-image w-full h-auto rounded-3xl transform transition-all duration-1000 ease-out"
                                        src={project.imageSrc}
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>

                                <div className="project-content space-y-6 text-white">
                                    <motion.h3 
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness: 500 }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                    
                                    <p className="text-lg md:text-xl text-gray-300 max-w-lg">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, i) => (
                                            <motion.span
                                                key={i}
                                                className="project-tag px-3 py-1 bg-purple-900/50 text-purple-100 rounded-full text-sm"
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    backgroundColor: 'rgba(107, 33, 168, 0.7)'
                                                }}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-6">
                                        <motion.a
                                            ref={el => magneticElements.current.push(el)}
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-button flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white shadow-lg hover:shadow-pink-500/30 transition-all text-lg"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FiExternalLink className="text-xl" />
                                            <span>Live Demo</span>
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:hidden relative pb-2">
                <div className="mobile-section w-full space-y-4">
                    {projectImages.map((project, index) => (
                        <div 
                            key={`mobile-${project.id}`}
                            className={`mobile-panel w-full ${
                                index === projectImages.length - 1 ? 'pb-0' : 'pb-8'
                            } flex items-center justify-center px-4`}
                        >
                            <div className="relative w-full max-w-md mx-auto flex flex-col items-center z-20">
                                <motion.div 
                                    className="project-image-wrapper relative rounded-2xl overflow-hidden shadow-xl w-full mb-4"
                                    whileHover={{ scale: 0.98 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                                >
                                    <img
                                        className="project-image w-full h-auto rounded-2xl"
                                        src={project.imageSrc}
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                                </motion.div>

                                <div className="project-content space-y-3 text-white text-center">
                                    <motion.h3 
                                        className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness: 500 }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                    
                                    <p className="text-sm text-gray-300 px-2">
                                        {project.description}
                                    </p>
                                    
                                    <div className="flex flex-wrap gap-1 justify-center mt-2">
                                        {project.tags.map((tag, i) => (
                                            <motion.span
                                                key={i}
                                                className="px-2 py-1 bg-purple-900/50 text-purple-100 rounded-full text-xs"
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    backgroundColor: 'rgba(107, 33, 168, 0.7)'
                                                }}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-3">
                                        <motion.a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-button flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white shadow-lg text-xs mx-auto w-max"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <FiExternalLink className="text-sm" />
                                            <span>Live Demo</span>
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <motion.div 
                className="hidden lg:flex fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                <span className="text-sm text-purple-300 mb-2">Scroll horizontally</span>
                <motion.div
                    className="w-8 h-12 rounded-full border-2 border-purple-400 flex justify-center p-1"
                    animate={{ 
                        y: [0, 10, 0],
                    }}
                    transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <motion.div 
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{ 
                            y: [0, 15, 0],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default ProjectsSection;