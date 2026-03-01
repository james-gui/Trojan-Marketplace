import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  
  // Cursor following effect
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const [blob3Pos, setBlob3Pos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const fullText1 = 'Get things done.';
  const fullText2 = 'Let others help.';

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Typing animation
  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let restartTimer: NodeJS.Timeout;
    
    const runTypingAnimation = () => {
      setText1('');
      setText2('');
      setShowCursor1(true);
      setShowCursor2(false);
      
      let i = 0;
      timer1 = setInterval(() => {
        if (i < fullText1.length) {
          setText1(fullText1.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer1);
          setShowCursor1(false);
          setShowCursor2(true);
          
          setTimeout(() => {
            let j = 0;
            timer2 = setInterval(() => {
              if (j < fullText2.length) {
                setText2(fullText2.slice(0, j + 1));
                j++;
              } else {
                clearInterval(timer2);
                setShowCursor2(false);
                
                restartTimer = setTimeout(() => {
                  runTypingAnimation();
                }, 3000);
              }
            }, 100);
          }, 400);
        }
      }, 100);
    };

    runTypingAnimation();
    
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearTimeout(restartTimer);
    };
  }, []);

  // Cursor following effect with lerp and trail
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCursorPos({ x, y });
    };

    sectionRef.current?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      sectionRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  // Smooth lerp animation with requestAnimationFrame
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      setBlob1Pos(prev => ({
        x: lerp(prev.x, cursorPos.x, 0.15), // Fast follower
        y: lerp(prev.y, cursorPos.y, 0.15)
      }));
      
      setBlob2Pos(prev => ({
        x: lerp(prev.x, cursorPos.x, 0.08), // Medium trail
        y: lerp(prev.y, cursorPos.y, 0.08)
      }));
      
      setBlob3Pos(prev => ({
        x: lerp(prev.x, cursorPos.x, 0.04), // Slow trail
        y: lerp(prev.y, cursorPos.y, 0.04)
      }));

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [cursorPos, prefersReducedMotion]);

  const handleLearnMore = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-3 sm:px-6 py-12 sm:py-20 overflow-hidden bg-white" ref={sectionRef}>
      {/* Subtle gradient background - colorful */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-rose-50/50" />
      
      {/* Cursor-following interactive blobs with warm colors */}
      {!prefersReducedMotion && (
        <>
          {/* Main cursor follower - fastest - peach/orange */}
          <div
            className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              left: `${blob1Pos.x}px`,
              top: `${blob1Pos.y}px`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(254, 215, 170, 0.4) 0%, rgba(254, 215, 170, 0.2) 40%, transparent 70%)',
              filter: 'blur(60px)',
              opacity: cursorPos.x === 0 && cursorPos.y === 0 ? 0 : 1,
            }}
          />
          
          {/* Middle trail blob - coral/rose */}
          <div
            className="absolute w-56 h-56 sm:w-80 sm:h-80 rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              left: `${blob2Pos.x}px`,
              top: `${blob2Pos.y}px`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(252, 165, 165, 0.35) 0%, rgba(252, 165, 165, 0.15) 40%, transparent 70%)',
              filter: 'blur(70px)',
              opacity: cursorPos.x === 0 && cursorPos.y === 0 ? 0 : 0.8,
            }}
          />
          
          {/* Slowest trail blob - yellow/amber */}
          <div
            className="absolute w-64 h-64 sm:w-96 sm:h-96 rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              left: `${blob3Pos.x}px`,
              top: `${blob3Pos.y}px`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(254, 240, 138, 0.3) 0%, rgba(254, 240, 138, 0.12) 40%, transparent 70%)',
              filter: 'blur(80px)',
              opacity: cursorPos.x === 0 && cursorPos.y === 0 ? 0 : 0.6,
            }}
          />
        </>
      )}
      
      {/* Animated floating elements with warm colors */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-[10%] w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-orange-200/40 to-rose-200/40 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-[5%] w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-br from-yellow-200/40 to-orange-200/40 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.4, 0.25]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-rose-200/30 to-orange-200/30 rounded-full blur-3xl"
      />

      {/* Additional subtle orbs */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-40 left-[20%] w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-br from-amber-200/35 to-yellow-200/35 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-40 right-[15%] w-28 h-28 sm:w-56 sm:h-56 bg-gradient-to-br from-pink-200/35 to-rose-200/35 rounded-full blur-3xl"
      />

      <motion.div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded border border-slate-200 bg-white"
        >
          <span className="text-xs sm:text-sm text-slate-600 uppercase tracking-wider font-medium">Built for USC Trojans</span>
        </motion.div>
        
        <h1 className="text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-tight mb-4 sm:mb-6 font-semibold min-h-[70px] sm:min-h-[100px] md:min-h-[120px]">
          <span className="block">
            {text1}
            {showCursor1 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 sm:w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-black ml-1 align-middle"
              />
            )}
          </span>
          <span className="block text-slate-400">
            {text2}
            {showCursor2 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 sm:w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-slate-400 ml-1 align-middle"
              />
            )}
          </span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto font-normal leading-relaxed px-4 sm:px-0"
        >
          Connect with fellow Trojans. Buy services, offer your skills. From laundry to tutoring, everything you need is here.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group text-base font-medium"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </button>
          <button 
            onClick={handleLearnMore}
            className="w-full sm:w-auto px-6 py-3 border border-slate-200 rounded hover:bg-slate-50 transition-colors text-base font-medium"
          >
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}