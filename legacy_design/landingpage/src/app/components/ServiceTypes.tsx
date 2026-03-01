import { ShoppingBag, Shirt, GraduationCap, Coffee, Clock, Package } from 'lucide-react';
import { motion } from 'motion/react';

const services = [
  { icon: ShoppingBag, name: 'Grocery Shopping' },
  { icon: Shirt, name: 'Laundry Service' },
  { icon: GraduationCap, name: 'Tutoring' },
  { icon: Coffee, name: 'Food Delivery' },
  { icon: Clock, name: 'Line Standing' },
  { icon: Package, name: 'Package Pickup' }
];

export function ServiceTypes() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-3 sm:px-6 overflow-hidden" id="services">
      {/* Floating subtle orbs with warm colors */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-24 right-[8%] w-64 h-64 sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-orange-200/25 to-rose-200/25 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.35, 0.25]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-[10%] w-56 h-56 sm:w-[450px] sm:h-[450px] bg-gradient-to-br from-yellow-200/25 to-amber-200/25 rounded-full blur-3xl"
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
            Popular services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-slate-600 font-normal"
          >
            Discover what your fellow Trojans are offering
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="aspect-square p-4 sm:p-6 rounded border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center gap-3 sm:gap-4 group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors"
              >
                <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-slate-600" strokeWidth={1.5} />
              </motion.div>
              <span className="text-xs sm:text-sm text-slate-600 font-medium">{service.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}