import React, {useState} from 'react'
import "../styles/css/Home.css";
import Header from '../components/Header';
import Card from '../components/Card';
import Filters from '../components/Filters';


export default function Home() {
    const [showFilters, setShowFilters] = useState(false);

    const openFilters = ()=> {
        setShowFilters(prev => !prev);
        console.log('works!!!!!111');
    }


  return (
    <div className='home-main'>
        <Header openFilters = {openFilters} />
        <div className='home-container'>
            <Filters />
            <div className='cards-container'>
                {requests.map((request, key) => (
                    <Card key={key} {...request}/>
                ))}
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    </div>
  )
}
