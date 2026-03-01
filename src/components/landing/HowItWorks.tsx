import { motion } from 'framer-motion';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Post your request',
      description: 'Describe the service you need and submit your request to the marketplace'
    },
    {
      number: '02',
      title: 'Get matched & deposit',
      description: 'A student accepts your task. Secure it with a 10% deposit, and our AI creates an SMS group chat for coordination'
    },
    {
      number: '03',
      title: 'Complete & release payment',
      description: 'Service provider uploads proof photos when done. Review and release the remaining 90% once satisfied'
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-3 sm:px-6 overflow-hidden" id="how-it-works">
      {/* Floating subtle orbs with warm colors */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.35, 0.25]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-32 right-[12%] w-56 h-56 sm:w-[450px] sm:h-[450px] bg-gradient-to-br from-orange-200/25 to-amber-200/25 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-24 left-[8%] w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-rose-200/25 to-pink-200/25 rounded-full blur-3xl"
      />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 sm:mb-4 font-medium"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 font-normal"
          >
            Getting started is simple
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="mb-4 sm:mb-6">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                  className="text-5xl sm:text-6xl font-medium text-slate-200"
                >
                  {step.number}
                </motion.span>
              </div>
              <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 font-medium">{step.title}</h3>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
