import React, { useState } from 'react'
import "../styles/css/Filters.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Input from './Input.jsx';

export default function Filters({ setFiltrationParams = f => f, 
                                  active, 
                                  filters, 
                                  openFilters = f => f, 
                                  setCurrentPage = f => f}) 
{
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    function setFilters(name, newValue) {
        if (newValue === '') {
            newValue = null;
        }
        setFiltrationParams(prevState => {
            setCurrentPage(1);
            let obj = prevState;
            obj[name] = newValue;
            return {...obj};
         })
    }
    
    function clearFilter(id, setDatepicker = null) {
        if (setDatepicker) {
            setDatepicker(null);
        }
        document.querySelector(`#${id}`).value = ''; 
        setFilters(id, null)
    }
    function clearAllFilters() {
        if (!(filters.from || filters.to || filters.dateFrom || filters.dateTo)) {
            return;
        }
        clearFilter('from'); 
        clearFilter('to'); 
        clearFilter('dateFrom', setFromDate); 
        clearFilter('dateTo', setToDate)
    }
    
return (
    <div className={active? 'filters-main-mobile': `filters-main`}>
        {active? '' : <span className='filters-title'>Фильтры</span>}
        <form className='filters-form'>

            <label className='filters-label' htmlFor="from">Откуда</label>
            <Input id = 'from'
                   setFilters={setFilters}
                   clearFilter = {clearFilter}
                   filters = {filters}
             />

            <label className='filters-label' htmlFor="to">Куда</label>
            <Input id = 'to'
                   setFilters={setFilters}
                   clearFilter = {clearFilter}
                   filters = {filters}
             />

            <label className='filters-label' htmlFor="departure">Отправление</label>
            <div className='filters-input-container'>
                <DatePicker
                    id='dateFrom'
                    selected={fromDate}
                    dateFormat="dd-MM-yyyy"
                    placeholderText={'Выбрать дату'}
                    onChange={(date) => {setFromDate(date); setFilters('dateFrom', date)}}
                    className='filters-field'
                />
                {filters.dateFrom && 
                <button type = 'button' onClick={()=>clearFilter('dateFrom', setFromDate)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" 
                         d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75
                         1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925
                         11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z" fill="#6C6F80"/>
                    </svg>
                </button>
                }
            </div>

            <label className='filters-label' htmlFor="arrival">Прибытие</label>
            <div className='filters-input-container'>
                <DatePicker
                    id='dateTo'
                    selected= {toDate}
                    placeholderText={'Выбрать дату'}
                    dateFormat="dd-MM-yyyy"
                    onChange={(date) => {setToDate(date); setFilters('dateTo', date);}}
                    className='filters-field'
                />
                {filters.dateTo && 
                <button type = 'button' onClick={()=>clearFilter('dateTo', setToDate)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" 
                        d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 
                        1.8075L4.9425 6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 
                        11.25L11.25 10.1925L7.0575 6L11.25 1.8075Z" fill="#6C6F80"/>
                    </svg>
                </button>
                }
            </div>
            <button onClick={clearAllFilters} type='button' className='clear-filters-btn-desktop'>Сбросить фильтры</button>

            {/* only displayed in mobile */}
            <div className='filters-btn-container'>
                <button onClick={clearAllFilters} className='clear-filters-btn'>Сбросить фильтры</button>
                <button type='button' onClick={openFilters} className='apply-filters-btn'>Показать</button>
            </div> 

        </form>
    </div>
  )
  }
