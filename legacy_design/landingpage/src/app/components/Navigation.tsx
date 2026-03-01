import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/ad7522402a1946f3e932a50fbdbd0d81be0caded.png';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 sm:gap-12">
              <img src={logo} alt="TROJAN MARKETPLACE" className="h-5 sm:h-6" />
              
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-xs lg:text-sm font-medium text-slate-600 hover:text-black transition-colors tracking-wider uppercase"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-xs lg:text-sm font-medium text-slate-600 hover:text-black transition-colors tracking-wider uppercase"
                >
                  How it works
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-xs lg:text-sm font-medium text-slate-600 hover:text-black transition-colors tracking-wider uppercase"
                >
                  About
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button 
                onClick={() => {}}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-black transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => {}}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-black text-white rounded hover:bg-slate-800 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}