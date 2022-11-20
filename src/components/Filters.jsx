import React from 'react'
import "../styles/css/Filters.css"

export default function Filters() {
//styling, ignore it
    let activeLink = document.querySelector("button.active");
    function buttonStyle(e) {
        e.preventDefault();
        activeLink = document.querySelector("button.active");
        activeLink.classList.remove('active')
        e.target.classList.add('active')
    }

  return (
    <div className='filters-main'>
        <span className='filters-title'>Filters</span>
        <form className='filters-form'>
            <label className='filters-label' htmlFor="from">From</label>
            <input className='filters-field filters-input' id="from">
            </input>

            <label className='filters-label' htmlFor="to">To</label>
            <input className='filters-field filters-input' id="to">
            </input>

            <label className='filters-label' htmlFor="departure">Departure date</label>
            <input className='filters-field filters-input' id="departure">
            </input>

            <label className='filters-label' htmlFor="arrival">Arrival date</label>
            <input className='filters-field filters-input' id="arrival">
            </input>

            <label className='filters-label' htmlFor="weight">Size of delivarable</label>
            <select className='filters-field' id="weight">
                <option>Up to 1kg</option>
                <option>2kg</option>
                <option>Large</option>
            </select>

            <label className='filters-label' for="reward">Reward</label>
            <div className='reward-choice-container'>
                <button onClick={(e)=>buttonStyle(e)} className='reward-filter-btn reward-filter-btn-left '>Yes</button>
                <button onClick={(e)=>buttonStyle(e)} className='reward-filter-btn active'>No</button>
                <button onClick={(e)=>buttonStyle(e)} className='reward-filter-btn reward-filter-btn-right' >N/A</button>
            </div>
        </form>
    </div>
  )
}
