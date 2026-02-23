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


// Home page component
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
        {/* Home route */}
        <Route path="/" element={<HomePage />} />
        
        {/* Admin route */}
        <Route path="/AdminAom" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;