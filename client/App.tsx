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
import AdminDashboard from "./pages/AdminDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen">
            <Routes>
              {/* Public routes (no navigation) */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Routes with navigation */}
              <Route
                path="/*"
                element={
                  <div>
                    <Navigation />
                    <div className="pt-16 pb-20 md:pb-0">
                      <Routes>
                        {/* Public pages */}
                        <Route path="/" element={<Index />} />
                        <Route path="/mobile-app" element={<MobileApp />} />
                        <Route
                          path="/community"
                          element={
                            <AuthGuard fallback="preview">
                              <Community />
                            </AuthGuard>
                          }
                        />
                        <Route path="/help" element={<Help />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />

                        {/* Public with preview mode */}
                        <Route
                          path="/news"
                          element={
                            <AuthGuard fallback="preview">
                              <News />
                            </AuthGuard>
                          }
                        />
                        <Route
                          path="/events"
                          element={
                            <AuthGuard fallback="preview">
                              <Events />
                            </AuthGuard>
                          }
                        />
                        <Route
                          path="/store"
                          element={
                            <AuthGuard fallback="preview">
                              <Store />
                            </AuthGuard>
                          }
                        />

                        {/* Protected routes - require login */}
                        <Route
                          path="/feed"
                          element={
                            <AuthGuard>
                              <Feed />
                            </AuthGuard>
                          }
                        />
                        <Route
                          path="/run"
                          element={
                            <AuthGuard>
                              <Run />
                            </AuthGuard>
                          }
                        />
                        <Route
                          path="/profile"
                          element={
                            <AuthGuard>
                              <Profile />
                            </AuthGuard>
                          }
                        />
                        <Route
                          path="/notifications"
                          element={
                            <AuthGuard>
                              <Notifications />
                            </AuthGuard>
                          }
                        />

                        {/* Premium routes - require premium subscription */}
                        <Route
                          path="/segments"
                          element={
                            <AuthGuard requiresPremium>
                              <Segments />
                            </AuthGuard>
                          }
                        />
                        <Route
                          path="/analytics"
                          element={
                            <AuthGuard requiresPremium>
                              <Analytics />
                            </AuthGuard>
                          }
                        />

                        {/* Admin routes - require admin role */}
                        <Route
                          path="/admin"
                          element={
                            <AuthGuard requiresRole="admin">
                              <AdminDashboard />
                            </AuthGuard>
                          }
                        />

                        {/* Editor routes - require editor or admin role */}
                        <Route
                          path="/editor"
                          element={
                            <AuthGuard requiresRole="editor">
                              <EditorDashboard />
                            </AuthGuard>
                          }
                        />

                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </div>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
