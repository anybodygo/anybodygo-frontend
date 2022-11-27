import React, {useEffect, useState} from 'react'
import "../styles/css/Home.css";
import Card from '../components/Card';
import Filters from '../components/Filters';
import {useNavigate} from "react-router-dom";
import * as dayjs from "dayjs";
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);


export default function Home({showFilters}) {
    // eslint-disable-next-line no-sequences
    const getQueryParams = () => window.location.search
        .replace('?', '')
        .split('&')
        .map(item => {
            const data = item.split('=');
            if (data.length && data[0] === 'hash') {
                return {hash: data[1]}
            }
            return {};
        });

    const queryData = getQueryParams();

    const hash = queryData.length && Object.keys(queryData[0]).includes('hash') ? queryData[0]['hash'] : null;

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
                data = formatDate(data);
                setRequests(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    useEffect(() => {
        setCards(requests);
    }, [requests])

    function formatDate(arr) {
        arr.forEach(obj => {
            obj.dateFrom = dayjs(obj.dateFrom, 'DD-MM-YYYY', true).toDate();
            obj.dateTo = dayjs(obj.dateTo, 'DD-MM-YYYY', true).toDate();           
        })
        return arr;
    }

    //array of cards that will be displayed after filtration
    const [cards, setCards] = useState([...requests])

    
    const [filtrationParams, setFiltrationParams] = useState(
        {
            'from': null,
            'to': null,
            'dateFrom': null,
            'dateTo': null,
            "isRewardable": null
        });

    useEffect(() => {
        let allArray = requests;
        let filter = filtrationParams;
        let newArray = allArray.filter(function (el) {
            return ((el.from === filter.from) || filter.from === null)  &&
                   ((el.to === filter.to) || filter.to === null) &&
                   (filter.dateFrom === null || (el.dateFrom.getTime() >= filter.dateFrom.getTime())) &&
                   (filter.dateTo === null || (el.dateTo.getTime() <= filter.dateTo.getTime()));
          });
        setCards(newArray)        
    }, [filtrationParams, requests])
    

  return (
    <div className='home-main'>
        <div className='home-container'>
            <Filters active = {showFilters} setFiltrationParams = {setFiltrationParams}/>
           
            {showFilters ? '' : 
                <div className='cards-container'>
                    {cards.length === 0 ? 
                        <div><span>Unfortunately, there are no results for your query. 
                                Try changing the filters
                        </span></div> 
                     : cards.map((request, key) => (
                        <Card key={key} {...request}/>
                    ))}
                </div>} 
        </div>
    </div>
  )
}
