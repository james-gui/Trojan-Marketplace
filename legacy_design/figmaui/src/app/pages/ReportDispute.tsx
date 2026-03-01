import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DSCard } from '../components/design-system/DSCard';
import { BottomNavigation } from '../components/BottomNavigation';

export default function ReportDispute() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskTitle: '',
    disputeReason: '',
    description: '',
    uploadedFiles: [] as File[],
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, uploadedFiles: [...formData.uploadedFiles, ...files] });
  };

  const removeFile = (index: number) => {
    const newFiles = formData.uploadedFiles.filter((_, i) => i !== index);
    setFormData({ ...formData, uploadedFiles: newFiles });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to backend
    console.log('Dispute submitted:', formData);
    alert('Dispute report submitted successfully. Our team will review it within 24 hours.');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-slate-50 rounded transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          
          <h1 className="text-base tracking-tight">REPORT A DISPUTE</h1>
          
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Warning Banner */}
        <DSCard variant="bordered" className="bg-orange-50 border-orange-200 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} strokeWidth={1.5} className="text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              Disputes should only be filed if there is a genuine issue with a task. 
              False reports may result in account suspension.
            </div>
          </div>
        </DSCard>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block mb-2 text-sm text-slate-600 tracking-wide">
              TASK TITLE
            </label>
            <input
              type="text"
              value={formData.taskTitle}
              onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
              placeholder="Enter the task title"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* Dispute Reason */}
          <div>
            <label className="block mb-2 text-sm text-slate-600 tracking-wide">
              REASON FOR DISPUTE
            </label>
            <select
              value={formData.disputeReason}
              onChange={(e) => setFormData({ ...formData, disputeReason: e.target.value })}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-black transition-colors"
            >
              <option value="">Select a reason</option>
              <option value="not-completed">Task was not completed</option>
              <option value="poor-quality">Poor quality work</option>
              <option value="no-show">Service provider did not show up</option>
              <option value="incorrect-payment">Incorrect payment amount</option>
              <option value="safety-concern">Safety or security concern</option>
              <option value="other">Other issue</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm text-slate-600 tracking-wide">
              DESCRIPTION
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please provide details about the dispute..."
              required
              rows={6}
              className="w-full px-4 py-3 border border-slate-200 rounded focus:outline-none focus:border-black transition-colors resize-none"
            />
            <div className="mt-1 text-xs text-slate-600">
              Be as specific as possible. Include dates, times, and any relevant details.
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-2 text-sm text-slate-600 tracking-wide">
              EVIDENCE (OPTIONAL)
            </label>
            
            {formData.uploadedFiles.length > 0 && (
              <div className="space-y-2 mb-3">
                {formData.uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Upload size={16} strokeWidth={1.5} className="text-slate-600 flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label className="block w-full py-3 border-2 border-slate-200 border-dashed rounded hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer text-center">
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center justify-center gap-2 text-slate-600">
                <Upload size={20} strokeWidth={1.5} />
                <span className="text-sm">Upload photos or documents</span>
              </div>
            </label>
            <div className="mt-1 text-xs text-slate-600">
              Accepted formats: JPG, PNG, PDF (Max 5MB each)
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="flex-1 py-3 border border-slate-200 rounded hover:bg-slate-50 transition-colors text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-black text-white rounded hover:bg-slate-800 transition-colors text-base"
            >
              Submit Report
            </button>
          </div>
        </form>

        {/* Help Information */}
        <DSCard variant="bordered" className="bg-slate-50 mt-8">
          <h3 className="text-sm mb-3">What Happens Next?</h3>
          <div className="space-y-2 text-xs text-slate-600">
            <p>1. Our team will review your report within 24 hours</p>
            <p>2. We may contact you for additional information</p>
            <p>3. Both parties will be notified of the decision</p>
            <p>4. Payment holds will remain until resolution</p>
          </div>
        </DSCard>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
