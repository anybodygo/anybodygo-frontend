import React, {useEffect, useState} from 'react'
import "../styles/css/Home.css";
import Card from '../components/Card';
import Filters from '../components/Filters';
import {useNavigate} from "react-router-dom";
import { useRequests } from '../functions/useRequests';
import { filtrate } from '../functions/filtrate';
import getHash from '../functions/getHash';


export default function Home({showFilters, openFilters = f => f}) {

    const hash = getHash();

    const navigate = useNavigate();

    useEffect(() => {
        if (hash) {
            console.log(hash);
            navigate(`/requests/${hash}`)
        }
    }, [hash, navigate])

    const { requests } = useRequests();

    const [loading, setLoading] = useState(true);
    if (requests.length > 0 && loading) {
            setLoading(false);
        }

    const [filtrationParams, setFiltrationParams] = useState(
        {
            'from': null,
            'to': null,
            'dateFrom': null,
            'dateTo': null,
            "isRewardable": null
        });

    const [requestsFiltered, setRequestsFiltered] = useState([...requests])

    useEffect(() => {
        setRequestsFiltered(filtrate(requests, filtrationParams))
    }, [filtrationParams, requests])  

  return (
    <div className='home-main'>
        <div className='home-container'>            
            <Filters active = {showFilters} 
                     setFiltrationParams = {setFiltrationParams} 
                     filters = {filtrationParams}
                     openFilters = {openFilters}
                     />
           
            {showFilters ? '' : 
                <div className='cards-container'>
                    {loading && <div className='lds-dual-ring'></div>}
                    {requestsFiltered.length === 0 && !loading ? 
                        <div><span>Unfortunately, there are no results for your query. 
                                Try changing the filters
                        </span></div> 
                     : requestsFiltered.map((request, key) => (
                        <Card key={key} {...request}/>
                    ))}
                </div>} 
        </div>
    </div>
  )
}
