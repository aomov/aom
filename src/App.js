import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Parkour from './components/Parkour';
import Yoga from './components/Yoga';
import Store from './components/Store';
import Spots from './components/Spots';
import Events from './components/Events';
import Admin from './components/Admin';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import EventPage from './components/EventPage';

function HomePage() {
  return (
    <>
      <Header />
      <Landing />
      <Parkour />
      <Yoga />
      <Store />
      <Spots />
      <Events />
      <Pricing />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AdminAom" element={<Admin />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;