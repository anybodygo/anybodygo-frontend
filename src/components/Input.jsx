import React, { useEffect, useState } from "react";
import useThrottledEffect from "use-throttled-effect";
import "../styles/css/Input.css";

export default function Input({
  id,
  setFilters = (f) => f,
  clearFilter = (f) => f,
  filters,
}) {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useThrottledEffect(
    () => {
      if (input === "") {
        setOptions([
          {
            type: "CityId",
            value: 4400,
            name: "Москва",
            parent: "Россия",
            flag: null,
          },
          {
            type: "CountryId",
            value: 1280,
            name: "Грузия",
            parent: null,
            flag: null,
          },
          {
            type: "CityId",
            value: 20000000,
            name: "Бали",
            parent: "Индонезия",
            flag: null,
          },
        ]);
      } else {
        fetch(process.env.REACT_APP_API_PREFIX + `/locations/search?q=${input}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setOptions(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    1000,
    [input]
  );

  function chooseOption(obj) {
    setInput(obj.name);
    setShowOptions(false);
    setFilters(id, obj);
  }

  function chooseOption(obj) {
    if (obj === null) {
      setInput("");
    } else {
      setInput(obj.name);
    }
    setFilters(id, obj);
    setShowOptions(false);
  }

  function handleBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowOptions(false);
    }
  }
}

useEffect(() => {
  if (filters[`${id}`] === null) {
    setInput("");
  }
}, [filters, id]);

return (
  <div
    className="filters-loc-input-container"
    onFocus={() => setShowOptions(true)}
    onBlur={(e) => handleBlur(e)}
  >
    <input
      type="text"
      id={`${id}`}
      onChange={(e) => setInput(e.target.value)}
      className="filters-field filters-input"
      value={input}
      placeholder="Введите локацию"
    ></input>

    {showOptions && (
      <div className="input-options-container">
        {options && options.length ? (
          options.map((obj) => (
            <div
              key={`${obj.type}${obj.value}`}
              tabIndex="0"
              onClick={() => chooseOption(obj)}
              className="input-option"
            >
              {obj.name}
              {obj.parent ? `, ${obj.parent}` : ""}
            </div>
          ))
        ) : (
          <div className="input-option">
            <div className="loc-loading-icon"></div> Loading...
          </div>
        )}
      </div>
    )}
    {input.length > 0 && (
      <button type="button" onClick={() => chooseOption(null)}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.25 1.8075L10.1925 0.75L6 4.9425L1.8075 0.75L0.75 1.8075L4.9425
                        6L0.75 10.1925L1.8075 11.25L6 7.0575L10.1925 11.25L11.25 10.1925L7.0575
                        6L11.25 1.8075Z"
            fill="#6C6F80"
          />
        </svg>
      </button>
    )}
  </div>
);
