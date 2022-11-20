import React from 'react'
import "../styles/css/Home.css";
import Header from '../components/Header';
import Card from '../components/Card';
import Filters from '../components/Filters';


export default function Home() {
  return (
    <div className='home-main'>
        <Header />
        <div className='home-container'>
            <Filters />
            <div className='cards-container'>
                <Card />
                <Card />
                <Card />

            </div>


        </div>
        



    </div>
  )
}
