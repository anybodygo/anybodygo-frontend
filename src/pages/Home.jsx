import React, {useEffect, useState} from 'react'
import "../styles/css/Home.css";
import Header from '../components/Header';
import Card from '../components/Card';
import Filters from '../components/Filters';


export default function Home() {
    const [showFilters, setShowFilters] = useState(false);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_PREFIX + "/api/requests")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRequests(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    const openFilters = () => {
        setShowFilters(prev => !prev);
        console.log(showFilters);
    }


  return (
    <div className='home-main'>
        <Header openFilters={openFilters} />
        <div className='home-container'>
            <Filters />
            <div className='cards-container'>
                {requests.map((request, key) => (
                    <Card key={key} {...request}/>
                ))}
            </div>
        </div>
    </div>
  )
}
