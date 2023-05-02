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

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/test", element: <Home /> },
  { path: "/signup", element: <SignUpDoctor /> },
  { path: "/signupcmr", element: <SignUpCMR /> },
  { path: "/login", element: <Login /> },
  { path: "/calendar", element: <Calendar /> },
  {
    path: "doctor",
    element: <DoctorDashboard />,
    children: [
      {
        index: true,
        element: <ProgressContent />,
      },
      { path: "documents", element: <DoctorDocumentsContent /> },
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
