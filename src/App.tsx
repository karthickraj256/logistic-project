import "@fontsource/nunito-sans"; // default 400
import "@fontsource/nunito-sans/600.css"; // specific weight

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// admin pages
import Layout from "./admin/pages/layout";
import NotificationComponent from "./admin/components/notification";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<>Web Side</>} />
          <Route path="/admin/*" element={<Layout />} />
        </Routes>
      </Router>
      <NotificationComponent />
    </div>
  );
}

export default App;
