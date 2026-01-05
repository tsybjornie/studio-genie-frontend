import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import ProtectedRoute from "./components/ProtectedRoute";
import Pricing from "./components/Pricing";

// Light auth check - only requires JWT, not subscription
function AuthRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Authenticated pricing (Stripe checkout) */}
        <Route
          path="/app/pricing"
          element={
            <AuthRoute>
              <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
                <Pricing />
              </div>
            </AuthRoute>
          }
        />

        {/* Dashboard - requires active subscription */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/pricing" element={<Landing />} />
        <Route path="/contact" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
