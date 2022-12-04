import {useState, useEffect} from 'react';
import * as dayjs from "dayjs";
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export const useRequests = () => {
    const [requests, setRequests] = useState([]); 

    useEffect(() => {
        fetch(process.env.REACT_APP_API_PREFIX + "/requests")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data = formatDate(data);
                setRequests(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    function formatDate(arr) {
        arr.forEach(obj => {
            obj.dateFrom = dayjs(obj.dateFrom, 'DD-MM-YYYY', true).toDate();
            obj.dateTo = dayjs(obj.dateTo, 'DD-MM-YYYY', true).toDate();       
        })
        return arr;
    }

    return { requests }

}