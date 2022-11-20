import React from 'react'
import "../styles/css/Filters.css"

export default function Filters() {
  return (
    <div className='filters-main'>
        <span className='filters-title'>Filters</span>
        <form className='filters-form'>
            <label className='filters-label' for="from">From</label>
            <input className='filters-field filters-input' id="from">
            </input>

            <label className='filters-label' for="to">To</label>
            <input className='filters-field filters-input' id="to">
            </input>

            <label className='filters-label' for="departure">Departure date</label>
            <input className='filters-field filters-input' id="departure">
            </input>

            <label className='filters-label' for="arrival">Arrival date</label>
            <input className='filters-field filters-input' id="arrival">
            </input>

            <label className='filters-label' for="weight">Size of delivarable</label>
            <select className='filters-field' id="weight">
                <option>Up to 1kg</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
            </select>
            














        </form>
    </div>
  )
}
