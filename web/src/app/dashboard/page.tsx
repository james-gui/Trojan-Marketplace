"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getOpenListings, getMyListings, acceptListing } from "@/app/actions";
import { ServiceCard } from "@/components/figma/ServiceCard";
import { FloatingPillToggle } from "@/components/figma/FloatingPillToggle";
import { BottomNavigation } from "@/components/figma/BottomNavigation";
import { TaskDetailsDrawer } from "@/components/figma/TaskDetailsDrawer";
import { DesktopLayout } from "@/components/figma/DesktopLayout";
import { QuickViewPanel } from "@/components/figma/QuickViewPanel";

interface Task {
  id: string;
  title: string;
  location: string;
  price: number;
  description?: string;
  posterName?: string;
  posterEmail?: string;
  type: "Offer" | "Request";
  status?: string;
}

function MarketplaceMobile() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState("Offer");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [myOffers, setMyOffers] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const openResult = await getOpenListings();
        if (openResult.success && openResult.data) {
          setAvailableTasks(openResult.data as Task[]);
        }

        if (session?.user?.email) {
          const myResult = await getMyListings(session.user.email);
          if (myResult.success && myResult.data) {
            setMyOffers(myResult.data as Task[]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [session?.user?.email]);

  const displayedTasks = availableTasks.filter(task =>
    task.type === selectedTab &&
    task.posterEmail !== session?.user?.email
  );

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const handleAcceptTask = async () => {
    if (!selectedTask || !session?.user?.email) return;

    const res = await acceptListing(selectedTask.id, session.user.email);
    if (!res.success) {
      throw new Error(res.error || "Failed to accept listing");
    }
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-black mb-4" />
            <p>Loading marketplace...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedTab}
              initial={{ x: selectedTab === "Offer" ? -20 : 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: selectedTab === "Offer" ? 20 : -20, opacity: 0 }}
              transition={{
                type: "spring",
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
                  price={`$${typeof task.price === "number" ? task.price.toFixed(2) : task.price}`}
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
                  <h3 className="text-base mb-2">
                    No {selectedTab}s Yet
                  </h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Check back soon for new {selectedTab.toLowerCase()}s
                  </p>
                </div>
              )}

              {/* Add Listing Button */}
              <button
                onClick={() => router.push("/create-listing")}
                className="w-full mt-6 py-4 border-2 border-slate-200 border-dashed rounded hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-black"
              >
                <Plus size={20} strokeWidth={1.5} />
                <span className="text-base">Post New {selectedTab}</span>
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Floating Pill Toggle */}
      <FloatingPillToggle
        options={["Offer", "Request"]}
        selected={selectedTab}
        onChange={setSelectedTab}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Task Details Drawer */}
      <TaskDetailsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAccept={handleAcceptTask}
        task={
          selectedTask
            ? {
              title: selectedTask.title,
              location: selectedTask.location,
              price: `$${typeof selectedTask.price === "number" ? selectedTask.price.toFixed(2) : selectedTask.price}`,
              description: selectedTask.description,
              postedBy: selectedTask.posterName,
            }
            : null
        }
      />
    </div>
  );
}

function MarketplaceDesktop() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState("Offer");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [myOffers, setMyOffers] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const openResult = await getOpenListings();
        if (openResult.success && openResult.data) {
          setAvailableTasks(openResult.data as Task[]);
        }

        if (session?.user?.email) {
          const myResult = await getMyListings(session.user.email);
          if (myResult.success && myResult.data) {
            setMyOffers(myResult.data as Task[]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [session?.user?.email]);

  const displayedTasks = availableTasks.filter(task =>
    task.type === selectedTab &&
    task.posterEmail !== session?.user?.email
  );

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const handleAcceptTask = async () => {
    if (!selectedTask || !session?.user?.email) return;

    const res = await acceptListing(selectedTask.id, session.user.email);
    if (!res.success) {
      throw new Error(res.error || "Failed to accept listing");
    }
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
              {["Offer", "Request"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-3 text-base transition-colors relative ${selectedTab === tab
                    ? "text-black"
                    : "text-slate-600 hover:text-black"
                    }`}
                >
                  {tab}
                  {selectedTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Task Grid */}
        <main className="px-8 py-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-black mb-4" />
              <p>Loading marketplace...</p>
            </div>
          ) : (
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
                      price={`$${typeof task.price === "number" ? task.price.toFixed(2) : task.price}`}
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
                    <h3 className="text-xl mb-2">
                      No {selectedTab}s Yet
                    </h3>
                    <p className="text-base text-slate-600 mb-6">
                      Check back soon for new {selectedTab.toLowerCase()}s
                    </p>
                  </div>
                )}

                {/* Add Listing Button */}
                <button
                  onClick={() => router.push("/create-listing")}
                  className="w-full mt-6 py-4 border-2 border-slate-200 border-dashed rounded hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-slate-600 hover:text-black"
                >
                  <Plus size={20} strokeWidth={1.5} />
                  <span className="text-base">Post New {selectedTab}</span>
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        {/* Task Details Drawer */}
        <TaskDetailsDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onAccept={handleAcceptTask}
          task={
            selectedTask
              ? {
                title: selectedTask.title,
                location: selectedTask.location,
                price: `$${typeof selectedTask.price === "number" ? selectedTask.price.toFixed(2) : selectedTask.price}`,
                description: selectedTask.description,
                postedBy: selectedTask.posterName,
              }
              : null
          }
        />
      </div>
    </DesktopLayout>
  );
}

export default function Home() {
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
