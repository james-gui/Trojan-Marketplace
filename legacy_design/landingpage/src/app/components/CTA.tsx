import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CTAProps {
  onGetStarted: () => void;
}

export function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-3 sm:px-6 overflow-hidden">
      {/* Floating subtle orb with warm colors */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 90, 0],
          opacity: [0.25, 0.35, 0.25]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl"
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-8 sm:p-12 md:p-16 rounded border border-slate-200 bg-white text-center overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 sm:mb-6 font-medium">
              Ready to get started?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 font-normal max-w-xl mx-auto">
              Join hundreds of USC students already using Trojan Marketplace to make their lives easier.
            </p>
            
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-2 group font-medium text-sm sm:text-base"
            >
              Create your account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}