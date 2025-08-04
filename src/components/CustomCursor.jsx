import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorInner = useRef(null);
  const cursorOuter = useRef(null);
  const isMobile = useRef(false);

  useEffect(() => {
    // Check if mobile on initial render
    isMobile.current = window.matchMedia('(max-width: 768px)').matches;
    
    // Skip entirely if mobile
    if (isMobile.current) {
      // Ensure cursors are hidden on mobile
      if (cursorInner.current && cursorOuter.current) {
        cursorInner.current.style.display = 'none';
        cursorOuter.current.style.display = 'none';
      }
      return;
    }

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

    // Handle resize to check if device switches between mobile/desktop
    const handleResize = () => {
      const nowMobile = window.matchMedia('(max-width: 768px)').matches;
      if (nowMobile !== isMobile.current) {
        isMobile.current = nowMobile;
        if (nowMobile) {
          // Hide cursor if switched to mobile
          if (cursor && cursorFollower) {
            gsap.set([cursor, cursorFollower], { opacity: 0 });
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
          }
          // Remove event listeners
          window.removeEventListener('mousemove', moveCursor);
          window.removeEventListener('mousedown', handleClick);
          interactiveElements.forEach(el => {
            el.removeEventListener('mouseenter', handleHover);
            el.removeEventListener('mouseleave', handleHoverEnd);
          });
        } else {
          // Show cursor if switched to desktop
          if (cursor && cursorFollower) {
            cursor.style.display = 'block';
            cursorFollower.style.display = 'block';
            gsap.set([cursor, cursorFollower], { opacity: 1 });
          }
          // Re-add event listeners
          window.addEventListener('mousemove', moveCursor);
          window.addEventListener('mousedown', handleClick);
          interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleHoverEnd);
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('resize', handleResize);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot - will be hidden on mobile via the useEffect */}
      <div
        ref={cursorInner}
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference transform-gpu"
      />
      
      {/* Outer ring - will be hidden on mobile via the useEffect */}
      <div
        ref={cursorOuter}
        className="fixed w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9998] mix-blend-difference transform-gpu"
      />
    </>
  );
};

export default CustomCursor;