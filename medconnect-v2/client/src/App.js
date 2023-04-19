// import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpDoctor from "./pages/SignUpDoctor";
import SignUpCMR from "./pages/SignUpCMR";
import Login from "./components/Login/Login";
import Calendar from "./pages/Calendar";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/test", element: <Home /> },
  { path: "/signup", element: <SignUpDoctor /> },
  { path: "/signupcmr", element: <SignUpCMR /> },
  { path: "/login", element: <Login /> },
  { path: "/calendar", element: <Calendar /> },
]);

function App() {
  return (
    <RouterProvider router={router} />

    // <User />
  );
}

export default App;
