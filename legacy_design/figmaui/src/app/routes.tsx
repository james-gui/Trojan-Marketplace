import { createBrowserRouter } from "react-router";
import Marketplace from "./pages/Marketplace";
import Engagements from "./pages/Engagements";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PersonalInformation from "./pages/PersonalInformation";
import CreateListing from "./pages/CreateListing";
import IdentityVerification from "./pages/IdentityVerification";
import BillingMethods from "./pages/BillingMethods";
import PaymentHistory from "./pages/PaymentHistory";
import NotificationSettings from "./pages/NotificationSettings";
import ReportDispute from "./pages/ReportDispute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Marketplace,
  },
  {
    path: "/engagements",
    Component: Engagements,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/settings",
    Component: Settings,
  },
  {
    path: "/personal-information",
    Component: PersonalInformation,
  },
  {
    path: "/create-listing",
    Component: CreateListing,
  },
  {
    path: "/identity-verification",
    Component: IdentityVerification,
  },
  {
    path: "/billing-methods",
    Component: BillingMethods,
  },
  {
    path: "/payment-history",
    Component: PaymentHistory,
  },
  {
    path: "/notification-settings",
    Component: NotificationSettings,
  },
  {
    path: "/report-dispute",
    Component: ReportDispute,
  },
]);
