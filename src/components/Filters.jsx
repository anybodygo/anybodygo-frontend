import React, { useState } from 'react'
import "../styles/css/Filters.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import * as dayjs from "dayjs";

export default function Filters({ setFiltrationParams = f => f, active }) {

    //datepickers
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const destinations = ['Almaty', 'Antalya', 'Bali', 'Bangkok', 'Europe', 'Kas', 'Kazan', 
                          'Krasnodar', 'Minsk', 'Moscow', 'Novosibirsk', 'Pangan', 'Rostov-on-Don', 
                          'Russia', 'Seoul', 'Sheremetyevo', 'St.Petersburg', 'Sydney', 'Thailand', 
                          'Turkey', 'Warsaw', 'Yekaterinburg']


function setFilters(name, newValue) {
    //stringify the dates
    if (newValue !== null && typeof(newValue) === 'object') {
        //cut the hours, minutes and seconds that datepicker can put in
        newValue = dayjs(newValue).startOf('D').toDate()
    }
    setFiltrationParams(prevState => {
        let obj = prevState;
        obj[name] = newValue;
        return {...obj};
     })
    }

  return (
    <div className={active? 'filters-main-mobile': `filters-main`}>
        {active? '' : <span className='filters-title'>Filters</span>}
        <form className='filters-form'>

            <label className='filters-label' htmlFor="from">From</label>
            <select required 
                onChange={(e)=> setFilters(e.target.id, e.target.value)} 
                className='filters-field filters-input' id="from">
                    <option value="" disabled selected hidden>Select</option>
                    {destinations.map(item => <option>{item}</option>)}
            </select>

            <label className='filters-label' htmlFor="to">To</label>
            <select required 
                onChange={(e)=> setFilters(e.target.id, e.target.value)} 
                className='filters-field filters-input' id="to">
                    <option value="" disabled selected hidden>Select</option>
                    {destinations.map(item=> <option>{item}</option>)}
            </select>

            <label className='filters-label' htmlFor="departure">Start date</label>
            <DatePicker
                id='dateFrom'
                selected={fromDate}
                dateFormat="dd-MM-yyyy"
                placeholderText={'Select'}
                onChange={(date) => {setFromDate(date); setFilters('dateFrom', date)}}
                className='filters-field'
                isClearable
            />

            <label className='filters-label' htmlFor="arrival">End date</label>
            <DatePicker
                id='dateTo'
                selected= {toDate}
                placeholderText={'Select'}
                dateFormat="dd-MM-yyyy"
                onChange={(date) => {setToDate(date); setFilters('dateTo', date);}}
                className='filters-field'
                isClearable
            />
        </form>
    </div>
  )
  }
