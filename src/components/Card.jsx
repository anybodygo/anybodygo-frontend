import React from 'react'
import "../styles/css/Card.css";
import * as dayjs from "dayjs";
require('dayjs/locale/ru')
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat);


export default function Card({ guid, chatName, from, to, dateFrom, dateTo, message, context, hasReward, messageLink, setPopupId = f => f, fullText = false }) {

    const redirectTo = (link) => {
        console.debug(`redirecting to ${link}`)
        const redirectWindow = window.open(link, '_blank');
        redirectWindow.focus();
    }

    function formatDate(dateObject) {
        if (dateObject === null) return null;
        return dayjs(dateObject).locale('ru').format('D MMMM YYYY');
    }

    function openInPopup() {
        const url = new URL(window.location);
        url.searchParams.set('hash', guid);
        window.history.pushState({}, '', url);
        setPopupId(guid)
    }

    function getRewardInfo() {
        let color;
        let title;
        switch (hasReward) {
            case true:
                color = "#10B981";
                title = 'Есть';
                break
            case false:
                color = "#F59E0B";
                title = 'Нет';
                break;    
            default:
                color = '#9CA3AF';
                title = 'Неизвестно';
                break;            
        }
        return {
            color: color,
            title: title
        }
    }

    let longText;
    if (message) {
        longText = (message.split(' ').length > 50);
    }

    const disabled = dayjs(dateTo).toDate().getTime() < new Date().getTime()

  return (
    <div className={`card-main ${disabled ? ' disabled' : ''}`} onClick={openInPopup} >
        <div className='card-title'>
            <span>{ from }</span>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd" d="M8.35165 0.351785C8.57668 0.126538 8.88185 1.55408e-06 9.20005 1.54017e-06C9.51825
                1.52626e-06 9.82342 0.126538 10.0484 0.351785L14.8485 5.15779C15.0734 5.38311 15.1998 5.68866 15.1998
                6.00725C15.1998 6.32585 15.0734 6.6314 14.8485 6.85672L10.0484 11.6627C9.82213 11.8816 9.519 12.0027
                9.20437 12C8.88973 11.9972 8.58876 11.8709 8.36627 11.6481C8.14378 11.4253 8.01758 11.124 8.01484
                10.8089C8.01211 10.4939 8.13306 10.1904 8.35165 9.9638L11.1033 7.20876L2.00005 7.20876C1.68179
                7.20876 1.37656 7.08217 1.15152 6.85684C0.926477 6.63152 0.800049 6.32591 0.800049 6.00725C0.800049
                5.6886 0.926477 5.38299 1.15152 5.15766C1.37656 4.93234 1.68179 4.80575 2.00005 4.80575L11.1033
                4.80575L8.35165 2.05071C8.12668 1.82539 8.00031 1.51984 8.00031 1.20125C8.00031 0.882651 8.12668
                0.577099 8.35165 0.351785Z"
                fill="black"
            />
            </svg>
            <span>{ to }</span>
        </div>
        <div className='card-reward'>
                <svg width="13" height="14" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3.00002H5V6.00002H1C0.734784 6.00002 0.48043 5.89466 0.292893 5.70712C0.105357 5.51959 0 5.26523 0 5.00002V4.00002C0 3.7348 0.105357 3.48045 0.292893 3.29291C0.48043 3.10537 0.734784 3.00002 1 3.00002H2.268C2.01993 2.57046 1.94034 2.06404 2.04469 1.5791C2.14904 1.09416 2.42987 0.665299 2.83267 0.375791C3.23546 0.0862838 3.73147 -0.04321 4.22437 0.0124545C4.71728 0.068119 5.17192 0.304969 5.5 0.677015C5.82808 0.304969 6.28272 0.068119 6.77563 0.0124545C7.26853 -0.04321 7.76454 0.0862838 8.16733 0.375791C8.57013 0.665299 8.85096 1.09416 8.95531 1.5791C9.05966 2.06404 8.98007 2.57046 8.732 3.00002H10C10.2652 3.00002 10.5196 3.10537 10.7071 3.29291C10.8946 3.48045 11 3.7348 11 4.00002V5.00002C11 5.26523 10.8946 5.51959 10.7071 5.70712C10.5196 5.89466 10.2652 6.00002 10 6.00002H6V3.00002ZM3 2.00002C3 2.26523 3.10536 2.51959 3.29289 2.70712C3.48043 2.89466 3.73478 3.00002 4 3.00002H5V2.00002C5 1.7348 4.89464 1.48044 4.70711 1.29291C4.51957 1.10537 4.26522 1.00002 4 1.00002C3.73478 1.00002 3.48043 1.10537 3.29289 1.29291C3.10536 1.48044 3 1.7348 3 2.00002ZM6 3.00002H7C7.19778 3.00002 7.39112 2.94137 7.55557 2.83148C7.72002 2.7216 7.84819 2.56542 7.92388 2.3827C7.99957 2.19997 8.01937 1.99891 7.98079 1.80492C7.9422 1.61094 7.84696 1.43276 7.70711 1.29291C7.56725 1.15306 7.38907 1.05782 7.19509 1.01923C7.00111 0.980645 6.80004 1.00045 6.61732 1.07614C6.43459 1.15182 6.27841 1.28 6.16853 1.44445C6.05865 1.60889 6 1.80223 6 2.00002V3.00002ZM10 7.00002H6V12H8C8.53043 12 9.03914 11.7893 9.41421 11.4142C9.78929 11.0392 10 10.5304 10 10V7.00002ZM5 12V7.00002H1V10C1 10.5304 1.21071 11.0392 1.58579 11.4142C1.96086 11.7893 2.46957 12 3 12H5Z"
                    fill={getRewardInfo().color}/>
                </svg>

              {getRewardInfo().title}
            </div>
        <div className='card-info'>
            {context &&
                <span>
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.6675 0.966735H10.6698L18.8605 5.94824C19.2782 6.20549 19.5325 6.66524 19.5325 7.14974V16.4797C19.5325 17.1817 19.171 17.8582 18.547 18.2317L10.6398 23.0362C10.4147 23.1749 10.1556 23.2483 9.89125 23.2483C9.62693 23.2483 9.3678 23.1749 9.14275 23.0362L1.23325 18.2302C0.93298 18.0473 0.68482 17.7902 0.512625 17.4836C0.34043 17.1771 0.24999 16.8313 0.25 16.4797V7.14974C0.25 6.67274 0.499 6.20399 0.931 5.94974L9.12925 0.962235C9.36182 0.822641 9.62813 0.749274 9.89938 0.750067C10.1706 0.750861 10.4365 0.825783 10.6683 0.966735H10.6675ZM9.895 2.25224L2.56225 6.71249L5.19475 8.32124L12.5372 3.85799L9.895 2.25149V2.25224ZM15.0062 5.35949L7.6525 9.82348L9.9025 11.1975L17.3312 6.77398L15.0062 5.35949ZM1.75 16.479C1.75 16.674 1.85275 16.8517 2.0125 16.9485L9.14725 21.2835V12.4942L6.82 11.073V12.414C6.82 12.594 6.625 12.699 6.475 12.6165L4.465 11.394C4.43285 11.3726 4.40646 11.3436 4.38815 11.3096C4.36984 11.2756 4.36017 11.2376 4.36 11.199V9.56999L1.75 7.97548V16.479ZM17.77 16.9485L17.776 16.9455C17.8552 16.8963 17.9204 16.8275 17.9653 16.7458C18.0103 16.6641 18.0334 16.5722 18.0325 16.479V8.10149L10.6465 12.5002V21.2767L17.7708 16.9485H17.77Z" fill="#6B7280"/>
                    </svg>
                    { context[0].toUpperCase() + context.slice(1) }
                </span>
            }
            <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 5V1M14 5V1M5 9H15M3 19H17C18.1046 19 19 18.1046
                    19 17V5C19 3.89543 18.1046 3 17 3H3C1.89543 3 1 3.89543 1 5V17C1
                    18.1046 1.89543 19 3 19Z"
                    stroke="#6B7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>
                { formatDate(dateFrom) } - { formatDate(dateTo) }
            </span>
        </div>
        <div className='card-subheader'>{ chatName }</div>
        <div  className={`card-text ${fullText? 'popup-card-text' : ''}`}>
            { message }
            {(longText && (fullText === false)) ? <div className='card-text-blur'></div> : ''}
        </div>
        <button className='respond-btn' onClick={() => redirectTo(messageLink)}>Откликнуться в Telegram</button>
    </div>
  )
}
