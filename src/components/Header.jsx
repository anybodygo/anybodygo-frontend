import React from "react";
import "../styles/css/Header.css";
import { Link, useLocation } from "react-router-dom";

export default function Header({ openFilters = (f) => f }) {
  const location = useLocation();

  return (
    <div className="header-4K">
      <div className="header-align-container">
        <div className="header-main">
          <div className="header-title">
            AnybodyGo
            <svg
              width="25"
              height="15"
              viewBox="0 0 25 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.2292 15C3.75367 15 3.34538 14.828 3.00433 14.484C2.66329 14.135 2.49517 13.7173 2.49998 13.2308C2.49517 12.7492 2.66329 12.3364 3.00433 11.9923C3.34538 11.6483 3.75367 11.4763 4.2292 11.4763C4.68553 11.4763 5.08661 11.6483 5.43245 11.9923C5.77829 12.3364 5.95362 12.7492 5.95843 13.2308C5.95362 13.5551 5.86956 13.8524 5.70625 14.1227C5.54773 14.3881 5.33879 14.6019 5.07941 14.7641C4.82002 14.9213 4.53662 15 4.2292 15Z"
                fill="#1F2937"
              />
              <path
                d="M1.25 1.25H12.8995V9.09484H1.25V1.25Z"
                stroke="#1F2937"
                strokeWidth="2.5"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 0H20.8824C23.1565 0 25 1.85262 25 4.13793C25 6.42325 23.1565 8 20.8824 8H19V10.3448H16V8V4V0ZM17.0532 5.72411H16V2.27583L21.0545 2.27585C21.8529 2.27585 22.5 3.04778 22.5 3.99999C22.5 4.95221 21.8529 5.72413 21.0545 5.72413L17.0532 5.72411Z"
                fill="#1F2937"
              />
              <path
                d="M16.2012 14.4427C16.5423 14.7867 16.953 14.9587 17.4333 14.9587C17.7407 14.9587 18.0241 14.88 18.2835 14.7228C18.5429 14.5606 18.7519 14.3468 18.9104 14.0815C19.0737 13.8112 19.1577 13.5138 19.1626 13.1895C19.1577 12.7079 18.9824 12.2951 18.6366 11.9511C18.2907 11.6071 17.8896 11.435 17.4333 11.435C16.953 11.435 16.5423 11.6071 16.2012 11.9511C15.865 12.2951 15.6993 12.7079 15.7041 13.1895C15.6993 13.676 15.865 14.0937 16.2012 14.4427Z"
                fill="#1F2937"
              />
            </svg>
          </div>
          <span>Bring an important thing with you to someone in need</span>
          <button onClick={openFilters} className={`filter-btn`}>
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 2C1.5 1.44772 1.94772 1 2.5 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3.25245C13.5 3.51767 13.3946 3.77202 13.2071 3.95956L9.12623 8.04044C8.93869 8.22798 8.83333 8.48233 8.83333 8.74755V10.3333L6.16667 13V8.74755C6.16667 8.48233 6.06131 8.22798 5.87377 8.04044L1.79289 3.95956C1.60536 3.77202 1.5 3.51767 1.5 3.25245V2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            Filter
          </button>
        </div>
        <div className="header__link-container">
          <Link
            to={"/request"}
            className={`header__link ${
              location.pathname === "/request" && "header__link_active"
            }`}
          >
            Requests
          </Link>
          <Link
            to={"/offer"}
            className={`header__link ${
              location.pathname === "/offer" && "header__link_active"
            }`}
          >
            Offers
          </Link>
        </div>
      </div>
    </div>
  );
}
