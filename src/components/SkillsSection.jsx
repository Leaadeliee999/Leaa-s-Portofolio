import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const skillsData = [
    {
      category: 'Frontend',
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Framer Motion', 'GSAP'],
      color: '#9a74cf'
    },
    {
      category: 'Backend',
      items: ['Firebase'],
      color: '#FFCA28'
    },
    {
      category: 'Tools',
      items: ['GitHub', 'VSCode', 'Figma', 'Vercel', 'Canva', 'Firebase Tools'],
      color: '#7476d9'
    }
  ];

  // Tech symbols for floating background
  const techSymbols = ['</>', '{}', '()', '=>', 'npm', 'git', 'css', 'html', 'js', 'react'];

  useEffect(() => {
    // Title animation with ScrollTrigger
    gsap.fromTo(titleRef.current, 
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Floating tech symbols animation
    gsap.utils.toArray(".tech-symbol").forEach((symbol, i) => {
      gsap.to(symbol, {
        y: -20 + Math.random() * 40,
        x: -20 + Math.random() * 40,
        rotation: -15 + Math.random() * 30,
        duration: 8 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Card animations
    gsap.utils.toArray(".skill-card").forEach((card, i) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 80
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // Visual skill indicator with animated waves
  const SkillVisual = ({ color }) => {
    return (
      <div className="relative w-20 h-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${i * 16}px`,
              width: '12px',
              height: `${10 + i * 8}px`,
              backgroundColor: color
            }}
            animate={{
              height: [`${10 + i * 8}px`, `${30 - i * 4}px`, `${10 + i * 8}px`],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 min-h-screen overflow-hidden bg-gradient-to-b from-[#9a74cf50] to-black"
      id="skills"
    >
      {/* Floating tech symbols background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {techSymbols.map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute tech-symbol text-white/10 font-mono text-xl md:text-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        {/* Animated Title */}
        <h2 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-center mb-20 opacity-0"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-purple-300">
            Toolbox of Wonders
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-card relative bg-[#2a0b42]/70 backdrop-blur-sm p-8 rounded-2xl border border-purple-900/30 shadow-xl overflow-hidden"
              style={{ minHeight: '400px' }} // Added fixed height
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px rgba(154, 116, 207, 0.2)'
              }}
            >
              {/* Animated border */}
              <motion.div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 15px rgba(154, 116, 207, 0.4)'
                }}
                animate={{
                  boxShadow: [
                    'inset 0 0 15px rgba(154, 116, 207, 0.4)',
                    'inset 0 0 25px rgba(154, 116, 207, 0.6)',
                    'inset 0 0 15px rgba(154, 116, 207, 0.4)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              />

              <div className="relative z-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-purple-300 mb-6">
                  {category.category}
                </h3>

                <ul className="space-y-6">
                  {category.items.map((skill, skillIndex) => (
                    <motion.li 
                      key={skillIndex}
                      className="flex items-center justify-between py-2 relative"
                      onMouseEnter={() => setHoveredItem(`${catIndex}-${skillIndex}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + skillIndex * 0.05 }}
                    >
                      <motion.span 
                        className="text-lg font-medium"
                        style={{ color: category.color }}
                        whileHover={{ 
                          scale: 1.05,
                          x: 5
                        }}
                      >
                        {skill}
                      </motion.span>
                      
                      <SkillVisual color={category.color} />

                      {/* Hover effect */}
                      <AnimatePresence>
                        {hoveredItem === `${catIndex}-${skillIndex}` && (
                          <motion.div 
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              backgroundColor: `${category.color}10`,
                              border: `1px solid ${category.color}30`
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative animated elements */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full bg-purple-500/10 blur-xl pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};

export default SkillsSection;