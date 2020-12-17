import { useEffect, useReducer } from 'react';
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
} from "reducers/application";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => dispatch({ type: SET_DAY, day});


  const bookInterview = (id, interview) => {
    
    return axios.put(`/api/appointments/${id}`, {
      ...state.appointments[id],
      interview: {...interview},
    })
    .then((res) => {
      dispatch({ type: SET_INTERVIEW, id, interview });
    });
  };

  const cancelInterview = (id) => {

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
      });
      
  };

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      dispatch(data);
    };
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
    .then((all) => {
      const [days, appointments, interviewers] = all;
      dispatch({ type: SET_APPLICATION_DATA, 
        days: days.data, 
        appointments: appointments.data, 
        interviewers: interviewers.data
      });
    });
    return () => {
      ws.close();
    };
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;