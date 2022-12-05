import React, {useState, useEffect} from 'react'
import "../styles/css/CardPopup.css"
import Card from './Card'

export default function CardPopup({guid, setPopupId = f => f}) {

    const [request, setRequest] = useState(null);

    const fetchRequest = () => {
        fetch(process.env.REACT_APP_API_PREFIX + `/requests/${guid}`)
            .then(response => response.json())
            .then(data => {
                setRequest(data);
                console.log(data)
            })
            .catch(error => {
                console.error(error);
            })
    }
    useEffect(fetchRequest, []);

    function closePopup() {
        const url = new URL(window.location);
        url.searchParams.delete('hash');
        window.history.pushState({}, '', url);
        setPopupId(null)
    }


    if (request) {
      return (
        <div className='dark-hover'> 
             <div className='popup-main'>
                <div className='popup-header'>
                    <span>Детали запроса</span>
                    <button onClick={closePopup} className='close-popup-btn'>
                        <svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75
                                 1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925
                                 11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z" fill="#6C6F80"/>
                        </svg>
                    </button>
                    </div>
                <div className='popup-card-container'>
                   <Card {...request} setPopupId = {setPopupId} fullText = {true}></Card>
                </div>
            </div>
        </div>
      )
    }
}
