import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router';
import { EngagementCard } from '../components/EngagementCard';
import { ProofModal } from '../components/ProofModal';
import { SuccessOverlay } from '../components/SuccessOverlay';
import { DSCard } from '../components/design-system/DSCard';
import { BottomNavigation } from '../components/BottomNavigation';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import { DesktopLayout } from '../components/DesktopLayout';

interface ActiveEngagement {
  id: number;
  title: string;
  location: string;
  partner: string;
  stage: 'deposited' | 'in-progress' | 'release';
  amount: string;
  type: 'buying' | 'selling';
  hasProof: boolean;
  timeRemaining?: string;
}

const buyingEngagements: ActiveEngagement[] = [
  {
    id: 1,
    title: 'Laundry',
    location: 'Village',
    partner: 'Sarah Chen',
    stage: 'in-progress',
    amount: '$15.00',
    type: 'buying',
    hasProof: false,
    timeRemaining: '2 hours remaining',
  },
  {
    id: 2,
    title: 'Grocery Shopping',
    location: 'University Park',
    partner: 'Mike Johnson',
    stage: 'release',
    amount: '$20.00',
    type: 'buying',
    hasProof: true,
    timeRemaining: '24 hours to release',
  },
];

const sellingEngagements: ActiveEngagement[] = [
  {
    id: 3,
    title: 'Photography Session',
    location: 'Campus Center',
    partner: 'Emma Davis',
    stage: 'deposited',
    amount: '$50.00',
    type: 'selling',
    hasProof: false,
    timeRemaining: 'Waiting to start',
  },
  {
    id: 4,
    title: 'Spanish Tutoring',
    location: 'Leavey Library',
    partner: 'Alex Martinez',
    stage: 'in-progress',
    amount: '$30.00',
    type: 'selling',
    hasProof: false,
    timeRemaining: '1 hour remaining',
  },
];

function EngagementsContent() {
  const navigate = useNavigate();
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [successOverlayOpen, setSuccessOverlayOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ActiveEngagement | null>(null);

  const handleViewProof = (engagement: ActiveEngagement) => {
    setSelectedTask(engagement);
    setProofModalOpen(true);
  };

  const handleRelease = () => {
    setProofModalOpen(false);
    setTimeout(() => {
      setSuccessOverlayOpen(true);
    }, 200);
  };

  const handleSuccessClose = () => {
    setSuccessOverlayOpen(false);
    setTimeout(() => {
      navigate('/profile');
    }, 200);
  };

  const totalHeld = [...buyingEngagements, ...sellingEngagements].reduce((sum, eng) => {
    return sum + parseFloat(eng.amount.replace('$', ''));
  }, 0);

  const currentBalance = 100;
  const releaseAmount = selectedTask ? parseFloat(selectedTask.amount.replace('$', '')) : 0;
  const newBalance = (currentBalance + releaseAmount).toFixed(2);

  return (
    <>
      <div className="space-y-6">
        {/* Payment Status Overview */}
        <DSCard variant="bordered" className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={20} strokeWidth={1.5} />
            <h2 className="text-base">Payment Status</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl">${totalHeld.toFixed(2)}</div>
              <div className="text-xs text-slate-600 mt-1">Money Held</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{buyingEngagements.length}</div>
              <div className="text-xs text-slate-600 mt-1">Buying</div>
            </div>
            <div className="text-center">
              <div className="text-2xl">{sellingEngagements.length}</div>
              <div className="text-xs text-slate-600 mt-1">Selling</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-600">
            Funds are held securely until task completion. Release funds after verifying proof of work.
          </div>
        </DSCard>

        {/* Buying and Selling Accordions */}
        <Accordion type="multiple" defaultValue={['buying', 'selling']} className="space-y-0">
          {/* Buying Section */}
          <AccordionItem value="buying" className="border-y border-slate-200">
            <AccordionTrigger className="px-4 py-4 hover:bg-slate-50 hover:no-underline transition-colors">
              <div className="flex items-center gap-3">
                <h2 className="text-base text-black">Buying</h2>
                <span className="text-sm text-slate-600">({buyingEngagements.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {buyingEngagements.map((engagement) => (
                  <EngagementCard
                    key={engagement.id}
                    {...engagement}
                    onViewProof={() => handleViewProof(engagement)}
                  />
                ))}
                
                {buyingEngagements.length === 0 && (
                  <div className="text-center py-8 bg-slate-50 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">No active purchases</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Selling Section */}
          <AccordionItem value="selling" className="border-b border-slate-200">
            <AccordionTrigger className="px-4 py-4 hover:bg-slate-50 hover:no-underline transition-colors">
              <div className="flex items-center gap-3">
                <h2 className="text-base text-black">Selling</h2>
                <span className="text-sm text-slate-600">({sellingEngagements.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {sellingEngagements.map((engagement) => (
                  <EngagementCard
                    key={engagement.id}
                    {...engagement}
                    onViewProof={() => handleViewProof(engagement)}
                  />
                ))}
                
                {sellingEngagements.length === 0 && (
                  <div className="text-center py-8 bg-slate-50 rounded border border-slate-200">
                    <p className="text-sm text-slate-600">No active sales</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* How It Works */}
        <DSCard variant="default" className="space-y-3">
          <h3 className="text-sm">How Payment Works</h3>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex gap-2">
              <span className="text-black">1.</span>
              <span><strong>Money Held (10%):</strong> Buyer deposits funds when accepting task.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-black">2.</span>
              <span><strong>Job Progress:</strong> Seller completes task and uploads proof of completion.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-black">3.</span>
              <span><strong>Release (90%):</strong> Buyer reviews proof and releases funds to seller.</span>
            </div>
          </div>
        </DSCard>
      </div>

      {/* Proof Modal */}
      <ProofModal
        isOpen={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        title={selectedTask?.title || ''}
        amount={selectedTask?.amount || ''}
        proofImage="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
        uploadedBy={selectedTask?.partner || ''}
        uploadDate="March 1, 2026"
        onRelease={handleRelease}
      />

      {/* Success Overlay */}
      <SuccessOverlay
        isOpen={successOverlayOpen}
        onClose={handleSuccessClose}
        amount={selectedTask?.amount || '$0.00'}
        taskTitle={selectedTask?.title || ''}
        newBalance={`$${newBalance}`}
      />
    </>
  );
}

function EngagementsMobile() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-center">
          <h1 className="text-base tracking-tight">ACTIVE ENGAGEMENTS</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        <EngagementsContent />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}

function EngagementsDesktop() {
  return (
    <DesktopLayout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="px-8 py-6">
            <h1 className="text-xl tracking-tight">Active Engagements</h1>
          </div>
        </header>

        <main className="px-8 py-8 max-w-4xl">
          <EngagementsContent />
        </main>
      </div>
    </DesktopLayout>
  );
}

export default function Engagements() {
  return (
    <>
      {/* Mobile Version */}
      <div className="lg:hidden">
        <EngagementsMobile />
      </div>
      
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <EngagementsDesktop />
      </div>
    </>
  );
}
