import {useState} from 'react';

const useVisualMode = (init) => {
  const [history, setHistory] = useState([init]);

  const transition = (mode, replace = false) => {
    setHistory((prev) => {
      if (replace) return [...prev.slice(0,prev.length - 1), mode];
      return [...prev, mode];
    });
  };

  const back = () => {
    setHistory((prev) => {
      if (prev.length < 2) return prev;
      return prev.slice(0,prev.length - 1);
    });
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;