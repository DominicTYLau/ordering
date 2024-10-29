import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router, Route, and Routes
import App from './App/App';
import Settings from './Settings/Settings';
import Search from './Search/search';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Search" element={<Search />} /> {/* Add the Search route */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();