import React, {useState} from 'react'
import Home from './pages/Home.jsx'
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
        <div className="App">
            <Header openFilters = {openFilters} filtersShown = {showFilters}/>
           <Home showFilters={showFilters} openFilters = {openFilters}  />
        </div>
    );
}

export default App;
