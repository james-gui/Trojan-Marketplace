import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Upload, User, ArrowLeft } from 'lucide-react';

const majors = [
  'Accounting',
  'Architecture',
  'Biological Sciences',
  'Business Administration',
  'Cinema & Media Studies',
  'Computer Science',
  'Economics',
  'Engineering',
  'Environmental Studies',
  'Journalism',
  'Marketing',
  'Mathematics',
  'Music',
  'Psychology',
  'Theatre',
  'Other',
];

const campusAffiliations = [
  'Marshall School of Business',
  'Viterbi School of Engineering',
  'Dornsife College',
  'Annenberg School',
  'School of Cinematic Arts',
  'Thornton School of Music',
  'Athlete',
  'Greek Life',
  'Student Government',
  'Campus Organizations',
];

const graduationYears = [
  '2026',
  '2027',
  '2028',
  '2029',
];

export function ProfileSetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    major: '',
    graduationYear: '',
    phoneNumber: '',
    affiliation: '',
    bio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem('profileData', JSON.stringify(formData));
    
    // Ask user what they want to do
    const wantsToSell = window.confirm('Do you want to create a service listing? (OK = Yes, Cancel = Browse services)');
    
    if (wantsToSell) {
      navigate('/create-service');
    } else {
      navigate('/select-categories');
    }
  };

  const isFormValid = formData.major && formData.graduationYear && formData.phoneNumber;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded shadow-lg w-full max-w-2xl p-10"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl tracking-tight font-medium mb-2">
            Create Your Profile
          </h1>
          <p className="text-base text-slate-600">
            Join the Trojan Marketplace community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Profile Photo <span className="text-slate-400">(Optional)</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-slate-100 rounded flex items-center justify-center border border-slate-200">
                <User strokeWidth={1.5} className="w-8 h-8 text-slate-400" />
              </div>
              <button
                type="button"
                className="border border-slate-200 px-4 py-2 rounded hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Upload strokeWidth={1.5} className="w-4 h-4" />
                <span className="text-sm">Upload Photo</span>
              </button>
            </div>
          </div>

          {/* Major */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Major <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
              required
            >
              <option value="">Select your major</option>
              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          {/* Graduation Year */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Graduation Year <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.graduationYear}
              onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
              className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
              required
            >
              <option value="">Select graduation year</option>
              {graduationYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              placeholder="Enter your phone number"
              className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

          {/* Campus Affiliation */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Campus Affiliation <span className="text-slate-400">(Optional)</span>
            </label>
            <select
              value={formData.affiliation}
              onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
              className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"
            >
              <option value="">Select affiliation</option>
              {campusAffiliations.map((affiliation) => (
                <option key={affiliation} value={affiliation}>
                  {affiliation}
                </option>
              ))}
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Short Bio <span className="text-slate-400">(1 sentence max)</span>
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us a bit about yourself..."
              rows={3}
              maxLength={150}
              className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              {formData.bio.length}/150 characters
            </p>
          </div>

          {/* Trust Signal */}
          <div className="bg-slate-50 p-4 rounded border border-slate-200">
            <p className="text-xs text-slate-600 text-center">
              🔒 Only visible to verified USC students
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-black text-white px-6 py-4 rounded hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </motion.div>
    </div>
  );
}