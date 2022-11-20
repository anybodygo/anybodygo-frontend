import React, {useEffect, useState} from 'react';
import 'reactjs-popup/dist/index.css';
import Popup from "reactjs-popup";
import {useNavigate} from "react-router-dom";
import Card from "./Card";

export default function CardPopup({ id }) {
    const [request, setRequest] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetch(process.env.REACT_APP_API_PREFIX + `/api/requests/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRequest(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [id]);

    return (
        <Popup open={!!id} position="right center" onClose={() => navigate('/')} className='popup-card'>
            <div className='popup-body'>
                <div style={{display: 'flex'}} className='popup-header'>
                    <span>Request details</span>
                    <div style={{marginLeft: 'auto', display: 'flex'}}></div>
                    <div style={{fontSize: '20px', cursor: 'pointer', display: 'flex'}} onClick={() => navigate('/')}>x</div>
                </div>
                <hr/>
                <div>
                    <Card {...request}/>
                </div>
            </div>
        </Popup>
    );
};