"use client";

import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { ServiceTypes } from '@/components/landing/ServiceTypes';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { About } from '@/components/landing/About';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';
import { useState, useEffect, useRef } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [blob1Pos, setBlob1Pos] = useState({ x: 0, y: 0 });
  const [blob2Pos, setBlob2Pos] = useState({ x: 0, y: 0 });
  const [blob3Pos, setBlob3Pos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp animation with requestAnimationFrame
  useEffect(() => {
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
  }, [cursorPos]);

  const handleGetStarted = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Global cursor-following gradient blobs with warm colors */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-300 z-0"
        style={{
          left: `${blob1Pos.x}px`,
          top: `${blob1Pos.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(254, 215, 170, 0.35) 0%, rgba(254, 215, 170, 0.18) 40%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: cursorPos.x === 0 && cursorPos.y === 0 ? 0 : 1,
        }}
      />

      <div
        className="fixed w-[450px] h-[450px] rounded-full pointer-events-none transition-opacity duration-300 z-0"
        style={{
          left: `${blob2Pos.x}px`,
          top: `${blob2Pos.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(252, 165, 165, 0.3) 0%, rgba(252, 165, 165, 0.15) 40%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: cursorPos.x === 0 && cursorPos.y === 0 ? 0 : 0.85,
        }}
      />

      <div
        className="fixed w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-300 z-0"
        style={{
          left: `${blob3Pos.x}px`,
          top: `${blob3Pos.y}px`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.28) 0%, rgba(254, 240, 138, 0.12) 40%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: cursorPos.x === 0 && cursorPos.y === 0 ? 0 : 0.7,
        }}
      />

      <Navigation />
      <main className="pt-16 relative z-10 block">
        <Hero onGetStarted={handleGetStarted} />
        <ServiceTypes />
        <Features />
        <HowItWorks />
        <About />
        <CTA onGetStarted={handleGetStarted} />
      </main>
      <Footer />
    </div>
  );
}
