import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

// Import all your portfolio components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProgressBar from "./components/ProgressBar";
import FloatingCVButton from "./components/FloatingCVButton";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const landingRef = useRef();
  const portfolioRef = useRef();
  const particles = useRef([]);
  const cosmicFlares = useRef([]);
  const nebulaRef = useRef(null);
  const shockwaves = useRef([]);
  const titleRef = useRef(null);
  const enterTextRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);

  // Cosmic color palette
  const cosmicColors = [
    "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", 
    "#00bcd4", "#4caf50", "#ffeb3b", "#ff9800", "#ff5722"
  ];

  // Initialize GSAP plugins
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const startExitAnimation = () => {
    if (isExiting) return;
    setIsExiting(true);

    // 1. First, all particles explode outward
    particles.current.forEach(particle => {
      if (particle) {
        gsap.to(particle, {
          x: gsap.utils.random(-1000, 1000),
          y: gsap.utils.random(-1000, 1000),
          opacity: 0,
          duration: 1.5,
          ease: "power4.out"
        });
      }
    });

    // 2. Flares fade out
    cosmicFlares.current.forEach(flare => {
      if (flare) {
        gsap.to(flare, {
          scale: 0,
          opacity: 0,
          duration: 1,
          ease: "power4.out"
        });
      }
    });

    // 3. Final shockwave
    shockwaves.current.forEach(wave => {
      if (wave) {
        gsap.to(wave, {
          scale: 5,
          opacity: 0,
          duration: 2,
          ease: "power4.out"
        });
      }
    });

    // 4. Title disappears
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.in"
      });
    }

    // 5. "ENTER" text explodes
    if (enterTextRef.current) {
      gsap.to(enterTextRef.current, {
        scale: 10,
        opacity: 0,
        duration: 1.5,
        ease: "power4.in",
        onComplete: () => {
          setShowLanding(false);
          setTimeout(() => ScrollTrigger.refresh(), 100);
        }
      });
    }
  };

  useEffect(() => {
    document.body.style.cursor = 'none';

    if (showLanding) {
      // Wait for all refs to be set
      const initAnimation = () => {
        if (!titleRef.current || !enterTextRef.current || !nebulaRef.current) {
          requestAnimationFrame(initAnimation);
          return;
        }

        // MEGA NEBULA BACKGROUND PULSE
        gsap.to(nebulaRef.current, {
          scale: 1.2,
          opacity: 0.8,
          duration: 5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });

        // PARTICLE STORM (300 particles!)
        particles.current.forEach((particle, i) => {
          if (particle) {
            gsap.to(particle, {
              x: gsap.utils.random(-300, 300),
              y: gsap.utils.random(-300, 300),
              rotation: gsap.utils.random(0, 360),
              duration: gsap.utils.random(10, 20),
              delay: i * 0.01,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        });

        // COSMIC FLARES
        cosmicFlares.current.forEach((flare, i) => {
          if (flare) {
            gsap.to(flare, {
              scale: gsap.utils.random(1.5, 3),
              opacity: gsap.utils.random(0.2, 0.6),
              duration: gsap.utils.random(5, 10),
              delay: i * 0.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        });

        // SHOCKWAVE BURSTS
        shockwaves.current.forEach((wave, i) => {
          if (wave) {
            gsap.to(wave, {
              scale: 3,
              opacity: 0,
              duration: 4,
              delay: i * 1.5,
              repeat: -1,
              ease: "power2.out"
            });
          }
        });

        // TITLE ANIMATION
        gsap.from(titleRef.current, {
          y: -200,
          rotateX: 90,
          opacity: 0,
          duration: 2,
          ease: "elastic.out(1, 0.5)"
        });

        // ENTER TEXT GLITCH EFFECT
        const glitch = () => {
          if (enterTextRef.current) {
            gsap.to(enterTextRef.current, {
              keyframes: [
                { x: -5, color: "#9c27b0", duration: 0.05 },
                { x: 5, color: "#2196f3", duration: 0.05 },
                { x: 0, color: "white", duration: 0.05 }
              ],
              repeat: 3,
              yoyo: true
            });
          }
        };
        const glitchInterval = setInterval(glitch, 3000);

        // AUTO TRANSITION after 8 seconds
        const timer = setTimeout(() => {
          startExitAnimation();
        }, 8000);

        return () => {
          clearTimeout(timer);
          clearInterval(glitchInterval);
        };
      };

      initAnimation();
    }

    return () => {
      document.body.style.cursor = '';
    };
  }, [showLanding]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CustomCursor />

      {/* Portfolio Content (always in DOM but hidden behind landing page) */}
      <div 
        ref={portfolioRef} 
        className={`relative ${showLanding ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Header />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
        <ProgressBar />
        <FloatingCVButton />
      </div>

      {/* Landing Page */}
      <AnimatePresence>
        {showLanding && (
          <motion.div
            ref={landingRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* NEBULA BACKGROUND */}
            <div 
              ref={nebulaRef}
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, 
                  rgba(156, 39, 176, 0.8) 0%, 
                  rgba(33, 150, 243, 0.6) 40%, 
                  rgba(0, 0, 0, 0) 70%)`,
                filter: `blur(60px)`
              }}
            />

            {/* SHOCKWAVES */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                ref={el => shockwaves.current[i] = el}
                className="absolute rounded-full border border-white/20"
                style={{
                  width: '100vmin',
                  height: '100vmin',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.5
                }}
              />
            ))}

            {/* COSMIC FLARES */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  ref={el => cosmicFlares.current[i] = el}
                  className="absolute rounded-full"
                  style={{
                    width: gsap.utils.random(50, 200),
                    height: gsap.utils.random(50, 200),
                    background: `radial-gradient(circle, 
                      ${cosmicColors[Math.floor(Math.random() * cosmicColors.length)]} 0%, 
                      transparent 70%)`,
                    left: `${gsap.utils.random(0, 100)}%`,
                    top: `${gsap.utils.random(0, 100)}%`,
                    opacity: 0.3,
                    filter: 'blur(20px)'
                  }}
                />
              ))}
            </div>

            {/* PARTICLE STORM */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(300)].map((_, i) => (
                <motion.div
                  key={i}
                  ref={el => particles.current[i] = el}
                  className="absolute rounded-full"
                  style={{
                    width: gsap.utils.random(2, 6),
                    height: gsap.utils.random(2, 6),
                    backgroundColor: cosmicColors[Math.floor(Math.random() * cosmicColors.length)],
                    left: `${gsap.utils.random(0, 100)}%`,
                    top: `${gsap.utils.random(0, 100)}%`,
                    opacity: 0.8,
                    filter: `blur(${gsap.utils.random(0, 2)}px)`
                  }}
                />
              ))}
            </div>

            {/* MAIN TITLE */}
            <motion.h1
              ref={titleRef}
              className="text-8xl md:text-[10rem] font-bold text-center relative z-10"
              style={{
                background: 'linear-gradient(90deg, #9c27b0, #2196f3)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 0 30px rgba(156, 39, 176, 0.7)',
                lineHeight: '1'
              }}
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 2,
                ease: [0.175, 0.885, 0.32, 1.275] 
              }}
            >
              WELCOME
            </motion.h1>

            {/* ENTER TEXT */}
            <motion.h1
              ref={enterTextRef}
              className="mt-32 text-4xl md:text-6xl font-bold text-white text-center relative z-10 cursor-pointer"
              style={{
                textShadow: '0 0 20px rgba(255,255,255,0.8)',
                letterSpacing: '0.5rem'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startExitAnimation}
            >
              ENTER THE WORLD
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}