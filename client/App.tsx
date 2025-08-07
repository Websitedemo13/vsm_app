import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { AuthProvider, AuthGuard } from "./components/AuthGuard";
import Index from "./pages/Index";
import News from "./pages/News";
import Run from "./pages/Run";
import Store from "./pages/Store";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Events from "./pages/Events";
import Feed from "./pages/Feed";
import Analytics from "./pages/Analytics";
import Segments from "./pages/Segments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Community from "./pages/Community";
import MobileApp from "./pages/MobileApp";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <Navigation />
          <div className="pt-16 pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/news" element={<News />} />
              <Route path="/run" element={<Run />} />
              <Route path="/events" element={<Events />} />
              <Route path="/segments" element={<Segments />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/store" element={<Store />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
