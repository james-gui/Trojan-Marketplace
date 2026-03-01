import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Upload } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

const categories = [
  'Tutoring',
  'Laundry Service',
  'Food Pickup',
  'Grocery Shopping',
  'Class Notes',
  'Ride Share',
  'Room Cleaning',
  'Moving Help',
  'Campus Errands',
  'Others',
];

const steps = [
  'Basic Info',
  'Description',
  'Pricing',
  'Portfolio',
];

export function ServiceCreation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    whoFor: '',
    whatsIncluded: '',
    whyChoose: '',
    pricingModel: '',
    price: '',
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      sessionStorage.setItem('serviceData', JSON.stringify(formData));
      navigate('/service-live');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.title && formData.category;
      case 1:
        return formData.description;
      case 2:
        return formData.pricingModel && formData.price;
      default:
        return true;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded shadow-lg w-full max-w-3xl p-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-600 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft strokeWidth={1.5} className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-600 tracking-wider uppercase">
              {steps[currentStep]} • Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-xs text-slate-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-black"
            />
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <div>
              <h1 className="text-xl tracking-tight font-medium mb-2">
                What are you offering?
              </h1>
              <p className="text-sm text-slate-600 mb-6">
                Let's start with the basics
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Service Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Python Tutoring for Beginners"
                    className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Description */}
          {currentStep === 1 && (
            <div>
              <h1 className="text-xl tracking-tight font-medium mb-2">
                Describe your service
              </h1>
              <p className="text-sm text-slate-600 mb-6">
                Help students understand what you offer
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Overall Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide a clear overview of your service..."
                    rows={4}
                    className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Who is this for?
                  </label>
                  <input
                    type="text"
                    value={formData.whoFor}
                    onChange={(e) => setFormData({ ...formData, whoFor: e.target.value })}
                    placeholder="e.g., Students struggling with programming"
                    className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    What's included?
                  </label>
                  <input
                    type="text"
                    value={formData.whatsIncluded}
                    onChange={(e) => setFormData({ ...formData, whatsIncluded: e.target.value })}
                    placeholder="e.g., 1-hour session, practice problems, notes"
                    className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Why choose you?
                  </label>
                  <input
                    type="text"
                    value={formData.whyChoose}
                    onChange={(e) => setFormData({ ...formData, whyChoose: e.target.value })}
                    placeholder="e.g., 3 years experience, A+ in course"
                    className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pricing */}
          {currentStep === 2 && (
            <div>
              <h1 className="text-xl tracking-tight font-medium mb-2">
                Set your pricing
              </h1>
              <p className="text-sm text-slate-600 mb-6">
                Choose how you want to charge
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Pricing Model <span className="text-red-600">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Hourly', 'Fixed Price', 'Starting At'].map((model) => (
                      <label
                        key={model}
                        className={`flex items-center gap-3 p-4 border rounded cursor-pointer transition-colors ${
                          formData.pricingModel === model
                            ? 'border-black bg-slate-50'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="pricingModel"
                          value={model}
                          checked={formData.pricingModel === model}
                          onChange={(e) =>
                            setFormData({ ...formData, pricingModel: e.target.value })
                          }
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium">{model}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      $
                    </span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0"
                      className="w-full border border-slate-200 rounded pl-8 pr-4 py-3 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Portfolio */}
          {currentStep === 3 && (
            <div>
              <h1 className="text-xl tracking-tight font-medium mb-2">
                Showcase your work
              </h1>
              <p className="text-sm text-slate-600 mb-6">
                Upload samples to build trust (optional)
              </p>

              <div className="border-2 border-dashed border-slate-200 rounded p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <Upload strokeWidth={1.5} className="w-8 h-8 mx-auto mb-3 text-slate-400" />
                <p className="text-sm font-medium mb-1">Click to upload</p>
                <p className="text-xs text-slate-500">
                  Images, PDFs, or videos up to 10MB
                </p>
              </div>

              <div className="mt-6 bg-slate-50 p-4 rounded border border-slate-200">
                <p className="text-xs text-slate-600">
                  💡 Tip: Services with portfolio samples get 3x more messages
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="w-full bg-black text-white px-6 py-3 rounded hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? 'Publish Service' : 'Continue'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}