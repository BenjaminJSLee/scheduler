import {useState} from 'react';

const useVisualMode = (init) => {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  const transition = (mode, replace = false) => {
    if (replace) history.pop();
    setHistory([...history, mode]);
    setMode(mode);
  };

  const back = () => {
    if (history.length < 2) return;
    history.pop();
    setMode(history[history.length - 1]);
    setHistory([...history]);
  };

  return { mode, transition, back };
};

export default useVisualMode;