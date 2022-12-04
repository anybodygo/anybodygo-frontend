import React, {useState, useEffect} from 'react'
import "../styles/css/Home.css";
import Card from '../components/Card';
import Filters from '../components/Filters';
import getHash from '../functions/getHash';
import CardPopup from '../components/CardPopup';
import * as dayjs from "dayjs";

export default function Home({showFilters, openFilters = f => f}) {

    const hash = getHash();
    const [popupId, setPopupId] = useState(hash);

    const [requests, setRequests] = useState([]);
    const fetchRequests = (query = '') => {
        fetch(process.env.REACT_APP_API_PREFIX + `/requests${query}`)
            .then(response => response.json())
            .then(data => {
                setRequests(data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(fetchRequests, []);

    const [loading, setLoading] = useState(true);
    if (requests.length > 0 && loading) {
        setLoading(false);
    }

    const [filtrationParams, setFiltrationParams] = useState(
        {
            'from': null,
            'to': null,
            'dateFrom': null,
            'dateTo': null
        }
    );

    useEffect(()=> {
        let filters = [];
        if (filtrationParams.from) {
            filters.push(`from${filtrationParams.from.type}=${filtrationParams.from.value}`)
        }
        if (filtrationParams.to) {
            filters.push(`to${filtrationParams.to.type}=${filtrationParams.to.value}`)
        }
        if (filtrationParams.dateFrom) {
            const date = dayjs(filtrationParams.dateFrom).format('YYYY-MM-DD');
            filters.push(`dateFrom=${date}`)
        }
        if (filtrationParams.dateTo) {
            const date = dayjs(filtrationParams.dateTo).format('YYYY-MM-DD');
            filters.push(`dateTo=${date}`)
        }
        const query = '?' + filters.join('&');
        fetchRequests(query);
    }, [filtrationParams])


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
                    {popupId && 
                    <CardPopup request={requests.filter(obj => {
                        return obj.guid === popupId
                    })[0]} setPopupId = {setPopupId}/>
                    }
                    {loading && <div className='lds-dual-ring'></div>}
                    {requests.length === 0 && !loading ? 
                        <div><span>Unfortunately, there are no results for your query. 
                                Try changing the filters
                        </span></div> 
                     : requests.map((request, key) => (
                        <Card key={key} {...request} setPopupId = {setPopupId}/>
                    ))}
                </div>} 
        </div>
    </div>
  )
}
