import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import LandingPageContent from "../components/LandingPageContent/LandingPageContent";
import AboutUs from "../components/LandingPageContent/AboutUs";
import Footer from "../components/LandingPageContent/Footer";

function LandingPage() {
  const [events, setEvents] = useState([]);

  const useGetEvents = () => {
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get("/api/event");
          setEvents(response.data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };

      fetchEvents();
    }, []);
  };

  useGetEvents();

  return (
    <>
      <NavBar />
      <LandingPageContent />
      <AboutUs />
      <Footer />
      {/* <ul>
        {events.map((event) => (
          <li key={event.title}>
            Title: {event.title}, Date: {event.date}
          </li>
        ))}
      </ul> */}
    </>
  );
}

export default LandingPage;
