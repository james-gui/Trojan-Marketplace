import React from 'react';
import { motion } from 'motion/react';

interface FloatingPillToggleProps {
  options: [string, string];
  selected: string;
  onChange: (value: string) => void;
}

export function FloatingPillToggle({ options, selected, onChange }: FloatingPillToggleProps) {
  const selectedIndex = options.indexOf(selected);

  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 z-40"
      style={{
        bottom: 'calc(64px + 24px)', // 64px nav bar height + 24px spacing
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className="bg-black p-1 rounded-full inline-flex relative">
        {/* Animated slider background */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-white"
          initial={false}
          animate={{
            left: selectedIndex === 0 ? '4px' : '50%',
            right: selectedIndex === 0 ? '50%' : '4px',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />

        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-6 py-2.5 text-sm transition-colors duration-200 rounded-full whitespace-nowrap relative z-10 ${
              selected === option
                ? 'text-black'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}