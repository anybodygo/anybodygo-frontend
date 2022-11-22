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

    const [requests, setRequests] = useState([{"id":2,"chatId":"-1001738437352","messageId":"211","from":"St.Petersburg","to":"Denpasar","dateFrom":"2022-11-17","dateTo":"2022-11-24","message":"documents","context":null,"link":null,"isRewardable":true},{"id":3,"chatId":"-1001738437352","messageId":"221","from":"Bali","to":"Moscow","dateFrom":"2022-11-16","dateTo":"2022-12-16","message":"simcard","context":null,"link":null,"isRewardable":true},{"id":4,"chatId":"-1001738437352","messageId":"234","from":"Bali","to":"Moscow","dateFrom":"2022-11-16","dateTo":"2022-11-16","message":"simcard","context":null,"link":null,"isRewardable":true},{"id":5,"chatId":"-1001738437352","messageId":"236","from":"Bali","to":"Moscow, St.Petersburg","dateFrom":"2022-11-16","dateTo":"2022-12-16","message":"simcard","context":"Кто-нибудь летит с Бали в Москву или Питер? надо передать симкарту за вознаграждение! Пишите пожалуйста в лс ❤️","link":null,"isRewardable":true}]);

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

    const [filtrationParams, setFiltrationParams] = useState(
        {
            'from': null,
            'to': null,
            'dateFrom': null,
            'dateTo': null,
            "isRewardable": null
        });

        
    const openFilters = () => {
        setShowFilters(prev => !prev);
    }



    useEffect(() => {
        let allArray = requests;
        let fil = filtrationParams;
        let newArray = allArray.filter(function (el) {
            return ((el.from == fil.from) || fil.from === null)  &&
                   ((el.to == fil.to) || fil.to === null) &&
                   ((el.dateFrom == fil.dateFrom) || fil.dateFrom === null) &&
                   ((el.dateTo == fil.dateTo) || fil.dateTo === null) &&
                   ((el.isRewardable == fil.isRewardable) || fil.isRewardable === null);
          });
        setCards(newArray)        
    }, [filtrationParams, requests])
    

  return (
    <div className='home-main'>
        <Header openFilters={openFilters} />
        <div className='home-container'>
            <Filters open = {showFilters} setFiltrationParams = {setFiltrationParams}/>
           
           {showFilters ? '' : <div className='cards-container'>
                {cards.length === 0 ? 
                    <div >
                       <span>Unfortunately, there are no results for your query. Try changing the filters</span>
                    </div> 
                 : ''}
                {cards.map((request, key) => (
                    <Card key={key} {...request}/>
                ))}
            </div>} 
        </div>
    </div>
  )
}
