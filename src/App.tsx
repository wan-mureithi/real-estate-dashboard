import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RentersDashboard from "./views/RentersDashboard";
import InvestorsDashboard from "./views/InvestersDashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RentersDashboard />} />
        <Route path="/investors" element={<InvestorsDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

