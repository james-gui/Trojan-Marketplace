Trojan Marketplace Design System Guide
Color Palette (Monochrome Business)
    •    Deep Black: #000000 - Primary text, active states, buttons
    •    Stark White: #FFFFFF - Backgrounds, card surfaces
    •    Slate Grey Variations:
    •    slate-50 (#f8fafc) - Subtle backgrounds, hover states
    •    slate-200 (#e2e8f0) - Borders, dividers
    •    slate-400 (#94a3b8) - Disabled text, footer text
    •    slate-600 (#475569) - Secondary text, icons, labels
    •    slate-800 (#1e293b) - Button hover states
    •    Accent Colors (Minimal Use):
    •    Green: #15803d - Success states, "Verified" badges only
    •    Red: #dc2626 - Danger actions (Sign Out button)

Typography (Inter Font Family)
Import:
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
Font Weights:
    •    Regular: 400 - Body text, descriptions
    •    Medium: 500 - Labels, secondary headings
    •    Semi-bold: 600 - Not typically used (keep minimal)
Font Sizes:
    •    Headers (Mobile):
    •    Page titles: text-base (16px) with tracking-tight
    •    Section headings: text-sm (14px) with tracking-wider uppercase
    •    Headers (Desktop):
    •    Page titles: text-xl (20px) with tracking-tight
    •    Section headings: text-base (16px)
    •    Body Text:
    •    Primary: text-base (16px)
    •    Secondary: text-sm (14px)
    •    Captions/labels: text-xs (12px)
    •    Display Numbers:
    •    Balance/amounts: text-5xl (48px) with tracking-tight
    •    Card amounts: text-2xl (24px) with tracking-tight
Letter Spacing:
    •    Tight: tracking-tight - Headlines, numbers (compressed, professional)
    •    Wide: tracking-wider - Small uppercase labels (BALANCE, CREDITS)
    •    Normal: Default for body text

Border Radius (Square & Professional)
    •    Sharp (0px): Default for most elements - NO ROUNDING
    •    Subtle (4px): rounded - Used sparingly for:
    •    Buttons
    •    Cards
    •    Input fields
    •    Modal corners
Rule: If it needs to be clickable or interactive, use 4px. Otherwise, keep it square (0px).

Spacing System
Use Tailwind's spacing scale consistently:
    •    Padding:
    •    Mobile containers: px-4 (16px horizontal)
    •    Desktop containers: px-8 (32px horizontal)
    •    Cards: p-4 to p-6 (16-24px)
    •    Buttons: py-3 px-4 or py-4 px-6
    •    Gaps:
    •    List items: gap-3 or gap-4 (12-16px)
    •    Icon + text: gap-2 (8px)
    •    Sections: space-y-6 or space-y-8 (24-32px)
    •    Generous Whitespace:
    •    Section padding: py-8 to py-16 (32-64px)
    •    Balance display: py-16 (64px vertical)

Icons (Lucide React - Thin Minimal)
npm install lucide-react
Icon Style:
    •    Size: 20px for most UI icons, 16px for small indicators
    •    Stroke width: strokeWidth={1.5} - Thin lines for minimal look
    •    Color: text-slate-600 (secondary) or text-black (active)
Common Icons:
    •    Grid, FileText, User - Navigation
    •    ChevronRight - Menu items (right-pointing)
    •    Plus - Add actions
    •    DollarSign, CreditCard - Financial
    •    Check, CheckCircle - Success states
    •    AlertCircle - Warnings/disputes

Component Patterns
1. Buttons:
// Primary
className="bg-black text-white px-6 py-3 rounded hover:bg-slate-800 transition-colors"

// Secondary/Outline
className="border border-slate-200 px-6 py-3 rounded hover:bg-slate-50 transition-colors"

// Danger
className="text-red-600 hover:bg-red-50"
2. Cards:
// Standard card
className="bg-white border border-slate-200 rounded p-4 hover:bg-slate-50 transition-colors"

// With shadow (rarely used)
className="bg-white border border-slate-200 rounded p-6"
3. Menu Items:
// Full-width clickable rows
className="w-full flex items-center justify-between px-4 py-5 hover:bg-slate-50 transition-colors border-b border-slate-200"
4. Input Fields:
className="w-full border border-slate-200 rounded px-4 py-3 focus:outline-none focus:border-black transition-colors"

Animation (Motion/React)
npm install motion
Usage:
import { motion, AnimatePresence } from 'motion/react';

// Smooth tab transitions
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
>
Principles:
    •    Smooth, subtle animations (200-300ms)
    •    Spring physics for natural feel
    •    Fade + slight Y-axis movement for content changes
    •    No bouncing, no excessive motion

Layout Breakpoints
Mobile-First Approach:
    •    Mobile: Default styles (< 1024px)
    •    Desktop: lg: prefix (≥ 1024px)
Desktop Layout (3-Column):
    •    Sidebar: w-64 (256px fixed)
    •    Main content: flex-1 (fluid)
    •    Right panel: w-80 (320px fixed)

Language & Copy Guidelines
Simple, Non-Technical Terms:
    •    ✅ "Money Held" (not "Escrow")
    •    ✅ "Payment Status" (not "Transaction Status")
    •    ✅ "Deposit" (not "Earnest Money")
    •    ✅ "Release Funds" (not "Disburse Payment")
    •    ✅ "Requests" (not "Active Contracts")
    •    ✅ "Billing Methods" (not "Payment Sources")
Tone:
    •    Professional but approachable
    •    Clear and direct
    •    Minimal jargon
    •    Student-friendly

Key Design Principles
    1    Formal Business Aesthetic - Sharp edges, monochrome palette, professional typography
    2    Generous Whitespace - Don't crowd elements, let them breathe
    3    Minimal Icons - Thin stroke weight (1.5), used sparingly
    4    Clear Hierarchy - Size, weight, and spacing create visual order
    5    Consistent Borders - border-slate-200 for all dividers and card edges
    6    Smooth Interactions - Hover states with transition-colors, subtle animations
    7    No Blue Tints - Pure black/white for toggles and interactive states
    8    Square by Default - Only use 4px radius on interactive elements

Quick Reference: Tailwind Classes
/* Text Styles */
.heading-mobile { @apply text-base tracking-tight; }
.heading-desktop { @apply text-xl tracking-tight; }
.label-uppercase { @apply text-xs text-slate-600 tracking-wider uppercase; }
.body-text { @apply text-base text-black; }
.secondary-text { @apply text-sm text-slate-600; }

/* Containers */
.mobile-container { @apply max-w-md mx-auto px-4; }
.desktop-container { @apply px-8 max-w-4xl; }

/* Borders */
.divider-line { @apply border-t border-slate-200; }
.card-border { @apply border border-slate-200 rounded; }

/* Interactions */
.hover-lift { @apply hover:bg-slate-50 transition-colors; }
.focus-ring { @apply focus:outline-none focus:border-black; }

This design system creates a formal, trustworthy marketplace perfect for university students handling financial transactions. The monochrome palette and sharp geometry convey professionalism, while generous spacing and clear typography ensure usability.