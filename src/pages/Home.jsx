import React, {useEffect, useState} from 'react'
import "../styles/css/Home.css";
import Header from '../components/Header';
import Card from '../components/Card';
import Filters from '../components/Filters';


export default function Home() {
    const [showFilters, setShowFilters] = useState(false);

    const [requests, setRequests] = useState([{"id":2,"chatId":"-1001738437352","messageId":"211","from":"St.Petersburg","to":"Denpasar","dateFrom":"2022-11-17","dateTo":"2022-11-24","message":"documents","context":null,"link":null,"isRewardable":true},{"id":3,"chatId":"-1001738437352","messageId":"221","from":"Bali","to":"Moscow","dateFrom":"2022-11-16","dateTo":"2022-12-16","message":"simcard","context":null,"link":null,"isRewardable":true},{"id":4,"chatId":"-1001738437352","messageId":"234","from":"Bali","to":"Moscow","dateFrom":"2022-11-16","dateTo":"2022-11-16","message":"simcard","context":null,"link":null,"isRewardable":true},{"id":5,"chatId":"-1001738437352","messageId":"236","from":"Bali","to":"Moscow, St.Petersburg","dateFrom":"2022-11-16","dateTo":"2022-12-16","message":"simcard","context":"Кто-нибудь летит с Бали в Москву или Питер? надо передать симкарту за вознаграждение! Пишите пожалуйста в лс ❤️","link":null,"isRewardable":true}]);

    //array of cards that will be displayed after filtration
    const [cards, setCards] = useState([...requests])


    // useEffect(() => {
    //     fetch(process.env.REACT_APP_API_PREFIX + "/api/requests")
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             setRequests(data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }, []);

    function openFilters() {
        setShowFilters(prev => !prev);
    }

    function filtrate() {
        
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
