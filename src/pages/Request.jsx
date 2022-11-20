import React from 'react'
import CardPopup from "../components/CardPopup";
import {useParams} from "react-router-dom";


export default function Request() {
    const { id } = useParams();

    return (
        <div className='home-main'>
            <CardPopup id={id}/>
        </div>
    )
}
