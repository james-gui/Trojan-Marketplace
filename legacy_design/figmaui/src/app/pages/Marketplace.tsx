import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ServiceCard } from '../components/ServiceCard';
import { FloatingPillToggle } from '../components/FloatingPillToggle';
import { BottomNavigation } from '../components/BottomNavigation';
import { TaskDetailsDrawer } from '../components/TaskDetailsDrawer';
import { DesktopLayout } from '../components/DesktopLayout';
import { QuickViewPanel } from '../components/QuickViewPanel';

const availableTasks = [
  { id: 1, title: 'Laundry', location: 'Village', price: '$15.00' },
  { id: 2, title: 'Grocery Shopping', location: 'University Park', price: '$20.00' },
  { id: 3, title: 'Tutoring - Math 101', location: 'McCarthy Quad', price: '$35.00' },
  { id: 4, title: 'Dog Walking', location: 'West Campus', price: '$12.00' },
  { id: 5, title: 'Move-In Help', location: 'Parkside', price: '$45.00' },
  { id: 6, title: 'Bike Repair', location: 'Village', price: '$25.00' },
  { id: 7, title: 'Meal Prep', location: 'North Campus', price: '$30.00' },
  { id: 8, title: 'Resume Review', location: 'Online', price: '$18.00' },
];

const myOffers = [
  { id: 1, title: 'Photography Session', location: 'Campus Center', price: '$50.00' },
  { id: 2, title: 'Spanish Tutoring', location: 'Leavey Library', price: '$30.00' },
  { id: 3, title: 'Car Ride to Airport', location: 'Village', price: '$40.00' },
];

function MarketplaceMobile() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Available');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<typeof availableTasks[0] | null>(null);

  const displayedTasks = selectedTab === 'Available' ? availableTasks : myOffers;

  const handleTaskClick = (task: typeof availableTasks[0]) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-center">
          <h1 className="text-base tracking-tight">TROJAN MARKETPLACE</h1>
        </div>
      </header>

      {/* Service Cards List */}
      <main className="max-w-md mx-auto px-4 py-6 pb-32 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedTab}
            initial={{ x: selectedTab === 'Available' ? -20 : 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: selectedTab === 'Available' ? 20 : -20, opacity: 0 }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="space-y-3"
          >
            {displayedTasks.map((task) => (
              <ServiceCard
                key={task.id}
                title={task.title}
                location={task.location}
                price={task.price}
                verified={true}
                onClick={() => handleTaskClick(task)}
              />
            ))}

            {/* Empty State */}
            {displayedTasks.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Plus size={32} strokeWidth={1.5} className="text-slate-400" />
                </div>
                <h3 className="text-base mb-2">No {selectedTab === 'Available' ? 'Tasks' : 'Offers'} Yet</h3>
                <p className="text-sm text-slate-600 mb-6">
                  {selectedTab === 'Available' 
                    ? 'Check back soon for new tasks' 
                    : 'Post your first offer to get started'}
                </p>
              </div>
            )}

            {/* Add Listing Button - Only in "My Offers" View */}
            {selectedTab === 'My Offers' && (
              <button 
                onClick={() => navigate('/create-listing')}
                className="w-full mt-6 py-4 border-2 border-slate-200 border-dashed rounded hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-black"
              >
                <Plus size={20} strokeWidth={1.5} />
                <span className="text-base">Post New Listing</span>
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Pill Toggle */}
      <FloatingPillToggle
        options={['Available', 'My Offers']}
        selected={selectedTab}
        onChange={setSelectedTab}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Task Details Drawer */}
      <TaskDetailsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        task={selectedTask}
      />
    </div>
  );
}

function MarketplaceDesktop() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('Available');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<typeof availableTasks[0] | null>(null);

  const displayedTasks = selectedTab === 'Available' ? availableTasks : myOffers;

  const handleTaskClick = (task: typeof availableTasks[0]) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  return (
    <DesktopLayout rightPanel={<QuickViewPanel />}>
      <div className="min-h-screen bg-white">
        {/* Header with Fixed Tabs */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="px-8 py-4">
            <h1 className="text-xl tracking-tight mb-4">Marketplace</h1>
            
            {/* Fixed Top Tabs */}
            <div className="flex gap-1 border-b border-slate-200">
              {['Available', 'My Offers'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-3 text-base transition-colors relative ${
                    selectedTab === tab
                      ? 'text-black'
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  {tab}
                  {selectedTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Task Grid */}
        <main className="px-8 py-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Grid Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                {displayedTasks.map((task) => (
                  <ServiceCard
                    key={task.id}
                    title={task.title}
                    location={task.location}
                    price={task.price}
                    verified={true}
                    onClick={() => handleTaskClick(task)}
                  />
                ))}
              </div>

              {/* Empty State */}
              {displayedTasks.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Plus size={40} strokeWidth={1.5} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl mb-2">No {selectedTab === 'Available' ? 'Tasks' : 'Offers'} Yet</h3>
                  <p className="text-base text-slate-600 mb-6">
                    {selectedTab === 'Available' 
                      ? 'Check back soon for new tasks' 
                      : 'Post your first offer to get started'}
                  </p>
                </div>
              )}

              {/* Add Listing Button - Only in "My Offers" View */}
              {selectedTab === 'My Offers' && (
                <button 
                  onClick={() => navigate('/create-listing')}
                  className="w-full mt-6 py-4 border-2 border-slate-200 border-dashed rounded hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-black"
                >
                  <Plus size={20} strokeWidth={1.5} />
                  <span className="text-base">Post New Listing</span>
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Task Details Drawer */}
        <TaskDetailsDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          task={selectedTask}
        />
      </div>
    </DesktopLayout>
  );
}

export default function Marketplace() {
  return (
    <>
      {/* Mobile Version */}
      <div className="lg:hidden">
        <MarketplaceMobile />
      </div>
      
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <MarketplaceDesktop />
      </div>
    </>
  );
}
