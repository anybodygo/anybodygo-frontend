import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from './pages/Home.jsx'
import Request from "./pages/Request";


function App() {

  return (
        <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/requests/:id" element={<Request />}></Route>
          </Routes>
        </div>
      </Router>
    );
}

export default App;
