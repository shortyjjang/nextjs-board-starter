import { useEffect, useState, useRef, useCallback } from "react";

type UseWorkerResult = [
  result: string[] | null,
  postMessage: (message: PostReaquestBody) => void,
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

  const postMessage = useCallback((post: PostReaquestBody) => {
    if (workerRef.current) workerRef.current.postMessage({
        post
    });
  }, []);

  return [result, postMessage];
};

export default useWorker;
