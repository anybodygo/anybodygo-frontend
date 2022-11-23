import React, {useState} from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from './pages/Home.jsx'
import Request from "./pages/Request";
import Header from './components/Header';


function App() {

//временная мера, пока не поставим redux или useContext
//Header & Home use the same state, but they are both children of App,
//no other way around it in vanila react
    const [showFilters, setShowFilters] = useState(false);
    const openFilters = () => {
        setShowFilters(prev => !prev);
    }



  return (
        <Router>
        <div className="App">
            <Header openFilters = {openFilters}/>
          <Routes>
            <Route path="/" element={<Home showFilters={showFilters}/>}></Route>
            <Route path="/requests/:id" element={<Request />}></Route>
          </Routes>
        </div>
      </Router>
    );
}

export default App;
