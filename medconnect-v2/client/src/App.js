// import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
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
import CMRSettings from "./components/CMRDashboard/CMRSettings";
import UpcomingEventsContent from "./components/DoctorDashboard/UpcomingEventsContent";
import ProtectedRoute from "./components/Routing/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/test", element: <Home /> },
  { path: "/signup", element: <SignUpDoctor /> },
  { path: "/signupcmr", element: <SignUpCMR /> },
  { path: "/login", element: <Login /> },
  { path: "/calendar", element: <Calendar /> },
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
    ],
  },
  {
    path: "cmr",
    element: <CMRDashboard />,
    children: [
      {
        index: true,
        element: <DoctorsContent />,
      },
      { path: "settings", element: <CMRSettings /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>

    // <User />
  );
}

export default App;
