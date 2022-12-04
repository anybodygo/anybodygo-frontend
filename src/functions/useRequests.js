import {useState, useEffect} from 'react';

export const useRequests = () => {
    const [requests, setRequests] = useState([]); 

    useEffect(() => {
        fetch(process.env.REACT_APP_API_PREFIX + "/requests")
            .then(response => response.json())
            .then(data => {
                setRequests(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return { requests }

}