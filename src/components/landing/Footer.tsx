export function Footer() {
  return (
    <footer className="relative py-8 sm:py-12 px-3 sm:px-6 overflow-hidden bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2">
            <div className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Trojan Marketplace</div>
            <p className="text-sm text-slate-600 font-normal max-w-sm leading-relaxed">
              A student-to-student service marketplace built for the USC community.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-sm text-slate-600 hover:text-black transition-colors font-normal">How it works</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-sm text-slate-600 hover:text-black transition-colors font-normal">About</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-black transition-colors font-normal">Contact</a></li>
              <li><a href="#" className="text-sm text-slate-600 hover:text-black transition-colors font-normal">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-slate-400 font-normal text-center sm:text-left">© 2026 Trojan Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="text-xs sm:text-sm text-slate-400 hover:text-black transition-colors font-normal">Terms</a>
            <a href="#" className="text-xs sm:text-sm text-slate-400 hover:text-black transition-colors font-normal">Privacy</a>
            <a href="#" className="text-xs sm:text-sm text-slate-400 hover:text-black transition-colors font-normal">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
