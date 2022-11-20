import React from 'react'
import "../styles/css/Card.css";

export default function Card({ chatId, from, to, dateFrom, dateTo, message, context, isRewardable }) {
  return (
    <div className='card-main'>
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
        <div className='card-info'>
            {message &&
                <span>
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.00006 4.41667C8.25978 4.41667 8.47764 4.32897 8.65364
                        4.15358C8.82903 3.97758 8.91672 3.75972 8.91672 3.5C8.91672 3.24028
                        8.82903 3.02242 8.65364 2.84642C8.47764 2.67103 8.25978 2.58333 8.00006
                        2.58333C7.74033 2.58333 7.52278 2.67103 7.34739 2.84642C7.17139 3.02242
                        7.08339 3.24028 7.08339 3.5C7.08339 3.75972 7.17139 3.97758 7.34739
                        4.15358C7.52278 4.32897 7.74033 4.41667 8.00006 4.41667ZM0.391724
                        17.25L2.22506 4.41667H5.41047C5.36464 4.26389 5.32645 4.11478 5.29589
                        3.96933C5.26534 3.8245 5.25006 3.66806 5.25006 3.5C5.25006 2.73611 5.51742
                        2.08681 6.05214 1.55208C6.58686 1.01736 7.23617 0.75 8.00006 0.75C8.76395
                        0.75 9.41325 1.01736 9.94797 1.55208C10.4827 2.08681 10.7501 2.73611
                        10.7501 3.5C10.7501 3.66806 10.7348 3.8245 10.7042 3.96933C10.6737 4.11478
                        10.6355 4.26389 10.5896 4.41667H13.7751L15.6084 17.25H0.391724Z"
                        fill="#6B7280"
                    />
                    </svg>
                    { message }
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
                { dateFrom } - { dateTo }
            </span>
        </div>
        <div className='card-subheader'>Chat ID: { chatId }</div>
        <div className='card-text'>
            { context }
        </div>
        <button className='respond-btn'>Respond in Telegram</button>
        {isRewardable &&
            <div className='card-reward'>
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3" cy="3" r="3" fill="#10B981"/>
                </svg>
                Rewardable
            </div>
        }



    </div>
  )
}
