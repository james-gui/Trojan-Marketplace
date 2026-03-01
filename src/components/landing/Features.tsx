import { Sparkles, Users, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Sparkles,
    title: 'Easy to Use',
    description: 'Post a service or find help in seconds. Simple, intuitive, built for students.'
  },
  {
    icon: Users,
    title: 'Trusted Community',
    description: 'Every user is verified with their USC email. Trade safely within the Trojan family.'
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'All transactions are protected. Pay with confidence, get paid with ease.'
  },
  {
    icon: Zap,
    title: 'Instant Matching',
    description: 'Get matched with service providers instantly. Fast, efficient, reliable.'
  }
];

export function Features() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-3 sm:px-6 overflow-hidden">
      {/* Floating subtle orbs with warm colors */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-[10%] w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.35, 0.25]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-[5%] w-64 h-64 sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-amber-200/25 to-yellow-200/25 rounded-full blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 sm:mb-4 font-medium"
          >
            Everything you need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 font-normal"
          >
            A marketplace designed for the USC community
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded border border-slate-200 bg-white hover:bg-slate-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded bg-slate-50 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-slate-100 transition-colors">
                <feature.icon className="w-5 h-5 text-slate-600" strokeWidth={1.5} />
              </div>
              <h3 className="text-base sm:text-lg mb-2 sm:mb-3 font-medium">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
