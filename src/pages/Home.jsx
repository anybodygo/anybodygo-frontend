import React, {useState, useEffect} from 'react'
import "../styles/css/Home.css";
import Card from '../components/Card';
import Filters from '../components/Filters';
import { useRequests } from '../functions/useRequests';
import getHash from '../functions/getHash';
import CardPopup from '../components/CardPopup';

export default function Home({showFilters, openFilters = f => f}) {

    const hash = getHash();
    const [popupId, setPopupId] = useState(hash);

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

    useEffect(()=> {
        console.log('Fetching filtered data...')
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
                        return String(obj.id) === popupId
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
