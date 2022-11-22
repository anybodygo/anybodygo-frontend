import React, {useEffect, useState} from 'react'
import "../styles/css/Home.css";
import Card from '../components/Card';
import Filters from '../components/Filters';
import {useNavigate} from "react-router-dom";


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

    const [requests, setRequests] = useState([
        {
            "id": 16,
            "chatId": "-1001738437352",
            "chatName": "Эмигранты на Бали🔆",
            "chatLink": "https://t.me/l2ltest",
            "messageId": "295",
            "from": "St.Petersburg",
            "to": "Bali",
            "dateFrom": "01-12-2022",
            "dateTo": "05-12-2022",
            "message": "document",
            "context": "Йо! кто-нибудь летит из Питера в начале декабря? Нужно перевезти документ. Вознаграждение будет)",
            "link": "https://t.me/l2ltest/295",
            "isRewardable": true
        },
        {
            "id": 12,
            "chatId": "-1001738437352",
            "chatName": "л два л",
            "chatLink": "https://t.me/l2ltest",
            "messageId": "275",
            "from": "Moscow",
            "to": "Bali",
            "dateFrom": "22-12-2022",
            "dateTo": "22-01-2023",
            "message": "power of attorney",
            "context": "Кто-нибудь едет в Денпасар из Москвы в ближайшее время? Нужно доставить доверенность за небольшое вознаграждение",
            "link": "https://t.me/l2ltest/275",
            "isRewardable": true
        },
        {
            "id": 13,
            "chatId": "-1001738437352",
            "chatName": "Эмигранты на Бали🔆",
            "chatLink": "https://t.me/l2ltest",
            "messageId": "283",
            "from": "Yekaterinburg",
            "to": "Antalya",
            "dateFrom": "12-11-2022",
            "dateTo": "28-11-2022",
            "message": "power of attorney",
            "context": "Привет! Кто-нибудь летит в Анталью в ближайшее время? нужно отправить доверенность за небольшое вознаграждение 🤗💙",
            "link": "https://t.me/l2ltest/283",
            "isRewardable": true
        }]);

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
        let fil = filtrationParams;
        let newArray = allArray.filter(function (el) {
            return ((el.from === fil.from) || fil.from === null)  &&
                   ((el.to === fil.to) || fil.to === null) &&
                   ((el.dateFrom === fil.dateFrom) || fil.dateFrom === null) &&
                   ((el.dateTo === fil.dateTo) || fil.dateTo === null) &&
                   ((el.isRewardable === fil.isRewardable) || fil.isRewardable === null);
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
