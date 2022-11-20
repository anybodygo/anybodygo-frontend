import React, {useEffect, useState} from 'react'
import "../styles/css/Home.css";
import Header from '../components/Header';
import Card from '../components/Card';
import Filters from '../components/Filters';
import {useNavigate} from "react-router-dom";


export default function Home() {
    // eslint-disable-next-line no-sequences
    const getQueryParams = () => window.location.search
        .replace('?', '')
        .split('&')
        .reduce((r,e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {});

    const { hash } = getQueryParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (hash) {
            console.log(hash);
            navigate(`/requests/${hash}`)
        }
    }, [hash, navigate])

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

    useEffect(() => {
        setCards(requests);
    }, [requests])

    //array of cards that will be displayed after filtration
    const [cards, setCards] = useState([...requests])

    const [showFilters, setShowFilters] = useState(false);

    const openFilters = () => {
        setShowFilters(prev => !prev);
        console.log(showFilters);
    }
    

  return (
    <div className='home-main'>
        <Header openFilters={openFilters} />
        <div className='home-container'>
            <Filters open = {showFilters}/>
           
           {showFilters ? '' : <div className='cards-container'>
                {cards.map((request, key) => (
                    <Card key={key} {...request}/>
                ))}
            </div>} 
        </div>
    </div>
  )
}
