import React, {useEffect, useState} from 'react'
import "../styles/css/Pagination.css";

export default function Pagination({responsesCount, currentPage, setCurrentPage = f => f}) {

    const [currentPagesArr, setCurrentPageArr] = useState([])

    const cardsPerPage = 10;

    const pagesNumber = Math.ceil(responsesCount / cardsPerPage)
    
    const pages = [];
    for (let i=1; i<=pagesNumber; i++) {
        pages.push(i);
    }

    useEffect(()=> {
        let tempPages;
        if (pagesNumber <= 6) {
            tempPages = [...pages];
        } else if (currentPage === 3) {
            const sliced = pages.slice(0,4)
            tempPages = [...sliced, '...', pagesNumber - 2, pagesNumber - 1, pagesNumber];
        } else if (currentPage > 3 && currentPage < pagesNumber - 2) {
            const sliced = pages.slice(currentPage -2, currentPage + 1);
            tempPages = [1, '...', ...sliced, '...', pagesNumber];
        } else if (currentPage === pagesNumber - 2) {
            const sliced = pages.slice(pagesNumber - 4)
            tempPages = [1,2,3, '...', ...sliced];
        } else {
            tempPages = [1, 2, 3, '...', pagesNumber - 2, pagesNumber - 1, pagesNumber];
        }
        setCurrentPageArr(tempPages)
    }, [currentPage])

    function PageButton({n}) {
        function clickHandler() {
            !isNaN(n) && setCurrentPage(n)
        }
        return (
            <span onClick={clickHandler} 
            className={n === currentPage? 'page-active' : undefined}>{n}</span>
        )
    }

  return (
    <div className='pagination-main'>

        <div className='pagination-results-count'>
            Результаты 
            <b> {(currentPage - 1)*10+1}
            -
            {currentPage*10 < responsesCount ? currentPage*10 : responsesCount} </b> 
            из 
            <b> {responsesCount}</b>
        </div>

        <div className='pagination-pages-container'>
            {currentPagesArr.map(n => <PageButton n = {n} key={n}/>)}
        </div>

        <div className='pagination-btns-container'>
            <button 
                onClick={()=> setCurrentPage(prev => prev === 1? prev : prev - 1)
                }
                className='pagination-btn'>
                Назад
            </button>
            <button 
                onClick={()=> 
                    setCurrentPage(prev => prev === pagesNumber ? prev : prev + 1)
                }
                className='pagination-btn'>
                Вперед
            </button>
        </div>
    </div>
  )
}
