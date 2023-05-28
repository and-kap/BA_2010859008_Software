import { useContext, useState, useCallback } from "react";

const useHttp = () => {
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (config, apply) => {
        setError(null);

        try {
            const response = await fetch(config.url, {
                method: config.method || (config.method = 'GET'),
                headers: config.headers || { 'Content-Type': 'application/json' },
                body: config.body ? JSON.stringify(config.body) : null
            });

            if (!response.ok) {
                throw new Error(response.error);
            }
            const data = ['GET', 'POST', 'PATCH'].includes(config.method) ? await response.json() : null;
          
            apply(data);
        } catch (ex) {
            setError(ex.message || 'Something went wrong!');
        }
    }, []);
    return {
        error,
        sendRequest
    }
}

export default useHttp;