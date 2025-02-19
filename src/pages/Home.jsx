import React, {useState, useEffect} from 'react'
import "../styles/css/Home.css";
import Card from '../components/Card';
import Filters from '../components/Filters';
import getHash from '../functions/getHash';
import CardPopup from '../components/CardPopup';
import Pagination from '../components/Pagination';
import * as dayjs from "dayjs";

export default function Home({showFilters, openFilters = f => f}) {

    const hash = getHash();
    const [popupId, setPopupId] = useState(hash);

    const [requests, setRequests] = useState([]);

    const [requestsNumber, setRequestsNumber] = useState();

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);


    const fetchRequests = (query = '') => {
        fetch(process.env.REACT_APP_API_PREFIX + `/requests${query}`)
            .then(response => response.json())
            .then(data => {
                setRequests(data.data);
                setRequestsNumber(data.total)
                setLoading(false)
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            })
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
        setLoading(true);
        setRequests([]);
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
        const query = '?page=' + currentPage + '&' + filters.join('&');
        fetchRequests(query);
        //0 timeout resolves the blinking bug with scroll method called during react re-render
        setTimeout(()=> {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'auto'
            })
        }, 0)

    }, [filtrationParams, currentPage])


  return (
    <div className='home-main'>
        <div className='home-container'>            
            <Filters active = {showFilters} 
                     setFiltrationParams = {setFiltrationParams} 
                     filters = {filtrationParams}
                     openFilters = {openFilters}
                     setCurrentPage = {setCurrentPage}
                     />
            {showFilters ? '' : 
                <div className='cards-container'>
                    {popupId && 
                    <CardPopup guid = {popupId} setPopupId = {setPopupId}/>
                    }
                    {loading && <div className='lds-dual-ring'></div>}
                    {requests.length === 0 && !loading ? 
                        <div className='no-results-message'>
                            <span>К сожалению, по Вашему запросу нет результатов. 
                                Попробуйте изменить фильтры
                            </span>
                        </div> 
                     : requests.map((request, key) => (
                        <Card key={key} {...request} setPopupId = {setPopupId}/>
                    ))}
                    {(requests.length !== 0 && requestsNumber > 10)&&
                    <Pagination responsesCount = {requestsNumber}
                                currentPage = {currentPage}
                                setCurrentPage = {setCurrentPage}
                     />
                    }
                </div>} 
        </div>
    </div>
  )
}
