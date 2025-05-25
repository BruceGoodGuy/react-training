import { useState, useEffect } from 'react';

function useFetch<T>(url: string, options?: RequestInit): any {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(url, options ?? {})
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data: T) => {
                setData(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err);
                setLoading(false);
            });
    }, [url, options]);

    return { data, loading, error };
}

export default useFetch;
