import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsPending(true);
        setError(null);
        const data = await fetch(url);
        const response = await data.json();
        setData(response);
        setIsPending(false);
      } catch (error) {
        setError(error);
        setIsPending(false);
      }
    }
    fetchData();
  }, []);
  
  return { data, isPending, error };
}
export default useFetch;
