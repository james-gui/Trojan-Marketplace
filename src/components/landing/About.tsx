import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Shield, Sparkles, Camera } from 'lucide-react';

export function About() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-3 sm:px-6 overflow-hidden" id="about">
      {/* Floating subtle orbs with warm colors */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.35, 0.25]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-40 left-[15%] w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-32 right-[10%] w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-pink-200/25 to-rose-200/25 rounded-full blur-3xl"
      />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 sm:mb-6 font-medium"
          >
            About Trojan Marketplace
          </motion.h2>
        </div>
        
        <div className="space-y-6 sm:space-y-8 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Trojan Marketplace is a peer-to-peer service platform built exclusively for the USC community. 
            We connect students who need help with students who can provide services, creating a trusted 
            ecosystem where Trojans support each other.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you're swamped with midterms and need someone to grab groceries, or you're looking 
            to earn extra income by offering your skills, Trojan Marketplace makes it seamless. Our platform 
            handles everything from matching to payments, so you can focus on what matters.
          </motion.p>

          {/* USC and Service Images showcase section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 py-8 sm:py-12"
          >
            <div className="rounded overflow-hidden border border-slate-200 h-40 sm:h-64 relative group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1563310196-3f10e40dd789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXNoaW5nJTIwbWFjaGluZSUyMGxhdW5kcnklMjBiYXNrZXR8ZW58MXx8fHwxNzcyMzI5NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Laundry service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded overflow-hidden border border-slate-200 h-40 sm:h-64 relative group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623123096729-26b481292919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBiYWclMjB0YWtlb3V0fGVufDF8fHx8MTc3MjI3Nzc2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Delivery service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded overflow-hidden border border-slate-200 h-40 sm:h-64 relative group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629360035258-2ccb13aa3679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwdHV0b3JpbmclMjB0ZWFjaGluZyUyMHN0dWR5aW5nfGVufDF8fHx8MTc3MjMyOTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Tutoring service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded overflow-hidden border border-slate-200 h-40 sm:h-64 relative group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1622688994558-3c2f5abe6924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzaG9wcGluZyUyMGdyb2NlcmllcyUyMHN0b3JlfGVufDF8fHx8MTc3MjMyOTE4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Shopping service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>
          
          <div className="pt-6 sm:pt-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl sm:text-2xl mb-4 sm:mb-6 font-medium text-black"
            >
              How payments work
            </motion.h3>
            <div className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-4 sm:p-6 rounded border border-slate-200 bg-white"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-1 sm:mb-2 text-sm sm:text-base">Secure deposits</h4>
                    <p className="text-sm sm:text-base text-slate-600 font-normal">
                      When a service provider accepts your request, you'll place a 10% deposit to secure the booking. 
                      This protects both parties and shows commitment to the transaction.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="p-4 sm:p-6 rounded border border-slate-200 bg-white"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-1 sm:mb-2 text-sm sm:text-base">AI-powered coordination</h4>
                    <p className="text-sm sm:text-base text-slate-600 font-normal">
                      Once the deposit is confirmed, our AI automatically creates an SMS group chat between you 
                      and the service provider, making communication instant and effortless.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="p-4 sm:p-6 rounded border border-slate-200 bg-white"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-1 sm:mb-2 text-sm sm:text-base">Photo verification</h4>
                    <p className="text-sm sm:text-base text-slate-600 font-normal">
                      Service providers can upload photos as proof of completion. Review the work, and when you're 
                      satisfied, release the remaining 90% with a single tap.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="pt-6 sm:pt-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-xl sm:text-2xl mb-4 sm:mb-6 font-medium text-black"
            >
              Our mission
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              We believe in the power of community. By enabling students to help each other, we're not just 
              facilitating transactions—we're building connections and fostering a culture of collaboration 
              within the Trojan family. Every service completed is a relationship strengthened.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
