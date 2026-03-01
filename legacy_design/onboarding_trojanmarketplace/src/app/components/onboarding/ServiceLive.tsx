import { motion } from 'motion/react';
import { Share2, Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export function ServiceLive() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded shadow-lg w-full max-w-2xl p-12 text-center"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate('/create-service')}
          className="flex items-center gap-2 text-slate-600 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft strokeWidth={1.5} className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl tracking-tight font-medium mb-3">
            🎉 Your service is live!
          </h1>
          <p className="text-base text-slate-600 mb-8">
            Your listing is now visible to the USC community. Students can start messaging
            you right away.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-50 border border-slate-200 rounded p-6 mb-8"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-medium tracking-tight mb-1">0</div>
              <div className="text-xs text-slate-600">Views</div>
            </div>
            <div>
              <div className="text-2xl font-medium tracking-tight mb-1">0</div>
              <div className="text-xs text-slate-600">Messages</div>
            </div>
            <div>
              <div className="text-2xl font-medium tracking-tight mb-1">0</div>
              <div className="text-xs text-slate-600">Bookings</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <button
            onClick={() => alert('Would navigate to browse services page')}
            className="w-full bg-black text-white px-6 py-4 rounded hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Search strokeWidth={1.5} className="w-5 h-5" />
            Browse Students Looking for Services
          </button>

          <button
            onClick={() => alert('Would open share dialog')}
            className="w-full border border-slate-200 px-6 py-4 rounded hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 strokeWidth={1.5} className="w-5 h-5" />
            Share Your Listing
          </button>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-left"
        >
          <p className="text-xs text-slate-600 font-medium mb-3 uppercase tracking-wider">
            Tips to get your first booking:
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-black">•</span>
              <span>Respond to messages within 2 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black">•</span>
              <span>Add portfolio samples to your listing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black">•</span>
              <span>Share your service on social media</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}