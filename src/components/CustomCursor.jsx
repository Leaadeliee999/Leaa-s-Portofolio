import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorInner = useRef(null);
  const cursorOuter = useRef(null);

  useEffect(() => {
    // Skip on mobile devices
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const cursor = cursorInner.current;
    const cursorFollower = cursorOuter.current;

    // Set initial position and styles
    gsap.set([cursor, cursorFollower], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0
    });

    // Mouse move animation
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.1
      });
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.3
      });
    };

    // Click animation
    const handleClick = () => {
      gsap.to([cursor, cursorFollower], {
        scale: 0.7,
        duration: 0.1,
        onComplete: () => {
          gsap.to([cursor, cursorFollower], {
            scale: 1,
            duration: 0.3
          });
        }
      });
    };

    // Hover effects for interactive elements
    const handleHover = () => {
      gsap.to(cursorFollower, {
        scale: 1.5,
        duration: 0.3
      });
    };

    const handleHoverEnd = () => {
      gsap.to(cursorFollower, {
        scale: 1,
        duration: 0.3
      });
    };

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleClick);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleClick);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorInner}
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform-gpu"
      />
      
      {/* Outer ring */}
      <div
        ref={cursorOuter}
        className="fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9998] mix-blend-difference transform-gpu"
      />
    </>
  );
};

export default CustomCursor;