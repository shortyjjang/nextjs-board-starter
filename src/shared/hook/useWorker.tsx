import { useEffect, useState, useRef, useCallback } from "react";

type UseWorkerResult = [
  result: string[] | null,
  postMessage: (message: PostReaquestBody, token:string) => void,
];

const useWorker = ({ url }: { url: string }): UseWorkerResult => {
  const [result, setResult] = useState(null);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(url);

    workerRef.current.onmessage = (e) => {
      setResult(e.data);
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [url]);

  const postMessage = useCallback((list: PostReaquestBody, token:string) => {
    if (workerRef.current) workerRef.current.postMessage({
        list,
        token
    });
  }, []);

  return [result, postMessage];
};

export default useWorker;
