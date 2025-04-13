import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { useAuth } from "./contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

// Pages
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import SavedContentPage from "@/pages/SavedContentPage";
import PricingPage from "@/pages/PricingPage";
import NotFound from "@/pages/not-found";

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !currentUser) {
      setLocation("/login");
    }
  }, [currentUser, loading, setLocation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return currentUser ? <>{children}</> : null;
}

function App() {
  return (
    <>
      <Switch>
        {/* Public routes */}
        <Route path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/pricing" component={PricingPage} />
        
        {/* Protected routes */}
        <Route path="/dashboard">
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="/saved">
          <ProtectedRoute>
            <SavedContentPage />
          </ProtectedRoute>
        </Route>
        
        {/* Fallback */}
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
