import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  BookOpen,
  ShoppingBag,
  Shirt,
  UtensilsCrossed,
  Car,
  Sparkles,
  PenTool,
  Package,
  Users,
  Home,
  ArrowLeft,
} from 'lucide-react';

const categories = [
  { id: 'tutoring', name: 'Tutoring', icon: BookOpen },
  { id: 'laundry', name: 'Laundry Service', icon: Shirt },
  { id: 'food-pickup', name: 'Food Pickup', icon: UtensilsCrossed },
  { id: 'grocery', name: 'Grocery Shopping', icon: ShoppingBag },
  { id: 'notes', name: 'Class Notes', icon: PenTool },
  { id: 'rides', name: 'Ride Share', icon: Car },
  { id: 'cleaning', name: 'Room Cleaning', icon: Sparkles },
  { id: 'moving', name: 'Moving Help', icon: Package },
  { id: 'errands', name: 'Campus Errands', icon: Home },
  { id: 'others', name: 'Others', icon: Users },
];

export function CategorySelection() {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      if (selectedCategories.length < 5) {
        setSelectedCategories([...selectedCategories, categoryId]);
      }
    }
  };

  const handleContinue = () => {
    sessionStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    alert('Onboarding complete! Would navigate to dashboard.');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded shadow-lg w-full max-w-2xl p-10"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-600 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft strokeWidth={1.5} className="w-5 h-5" />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl tracking-tight font-medium mb-2">
            What services interest you?
          </h1>
          <p className="text-base text-slate-600">
            Select 3–5 categories to personalize your feed
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.id);

            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleCategory(category.id)}
                className={`p-4 rounded border transition-all ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon
                  strokeWidth={1.5}
                  className={`w-6 h-6 mb-2 ${isSelected ? 'text-white' : 'text-black'}`}
                />
                <span className="text-sm font-medium">{category.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Selection Counter */}
        <div className="mb-6 text-center">
          <p className="text-sm text-slate-600">
            {selectedCategories.length}/5 categories selected
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedCategories.length < 3}
          className="w-full bg-black text-white px-6 py-4 rounded hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Complete Setup
        </button>
      </motion.div>
    </div>
  );
}