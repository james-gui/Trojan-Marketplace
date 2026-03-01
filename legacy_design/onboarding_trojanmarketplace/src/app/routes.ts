import { createBrowserRouter } from "react-router";
import { ProfileSetup } from "./components/onboarding/ProfileSetup";
import { CategorySelection } from "./components/onboarding/CategorySelection";
import { ServiceCreation } from "./components/onboarding/ServiceCreation";
import { ServiceLive } from "./components/onboarding/ServiceLive";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProfileSetup,
  },
  {
    path: "/select-categories",
    Component: CategorySelection,
  },
  {
    path: "/create-service",
    Component: ServiceCreation,
  },
  {
    path: "/service-live",
    Component: ServiceLive,
  },
]);