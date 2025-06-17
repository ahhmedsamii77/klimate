import { useEffect, useState } from "react";

export default function useDebounce(query: string, delay: number) {
  const [debounceValue, setdebounceValue] = useState<string>(query);
  useEffect(() => {
    const handler = setTimeout(() => {
      setdebounceValue(query);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [query, delay]);
  return { debounceValue };
}
