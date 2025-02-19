import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpDoctor from "./pages/SignUpDoctor";
import SignUpCMR from "./pages/SignUpCMR";
import Login from "./components/Login/Login";
import Calendar from "./pages/Calendar";
import { AuthProvider } from "./contexts/AuthContext";
import DoctorDashboard from "./pages/DoctorDashboard";
import ProgressContent from "./components/DoctorDashboard/ProgressContent";
import DoctorDocumentsContent from "./components/DoctorDashboard/DoctorDocumentsContent";
import CMRDashboard from "./pages/CMRDashboard";
import DoctorsContent from "./components/CMRDashboard/DoctorsContent";
import UpcomingEventsContent from "./components/DoctorDashboard/UpcomingEventsContent";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
import SettingsContent from "./components/DoctorDashboard/SettingsContent";
import ForgotPassword from "./components/Login/ForgotPassword";
import ResetPassword from "./components/Login/ResetPassword";
import NotFoundPage from "./components/Routing/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/signup", element: <SignUpDoctor /> },
  { path: "/signupcmr", element: <SignUpCMR /> },
  { path: "/login", element: <Login /> },
  { path: "/calendar", element: <Calendar /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },

  {
    path: "doctor",
    element: (
      <ProtectedRoute requiredRole="doctor">
        <DoctorDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ProgressContent />,
      },
      { path: "documents", element: <DoctorDocumentsContent /> },
      { path: "upcoming", element: <UpcomingEventsContent /> },
      { path: "settings", element: <SettingsContent /> },
    ],
  },
  {
    path: "cmr",
    element: (
      <ProtectedRoute requiredRole="cmr_member">
        <CMRDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DoctorsContent />,
      },
      { path: "settings", element: <SettingsContent /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
