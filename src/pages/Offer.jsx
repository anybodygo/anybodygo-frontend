import CardPopup from "../components/CardPopup";
import React from "react";
import {useParams} from "react-router-dom";

export default function Offer() {
  const { id } = useParams();

  return (
    <div className='home-main'>
      <CardPopup id={id}/>
    </div>
  )
}