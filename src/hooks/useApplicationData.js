import { useEffect, useReducer } from 'react';
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const updateSpots = (state, newAppointments, id) => {
  let newDay = state.days.find((day) => day.appointments.includes(id));

  const spots = newDay.appointments.reduce((numSpots, appId) => {
    return numSpots + (!newAppointments[appId].interview ? 1 : 0)
  }, 0);

  newDay = {
    ...newDay,
    spots,
  };

  const days = state.days.map( (day) => {
    return day.id === newDay.id ? newDay : day;
  });

  return days;
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.day};
    case SET_APPLICATION_DATA:
      return {...state, 
        days: action.days, 
        appointments: action.appointments,
        interviewers: action.interviewers,
      }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview && {...action.interview},
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment,
      };

      const days = updateSpots(state, appointments, action.id);

      return {...state, 
        days, 
        appointments,
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

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
    // const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    // ws.onmessage = (evt) => {
    //   const data = JSON.parse(evt.data);
    //   dispatch(data);
    // };
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
    // return () => {
    //   ws.close();
    // };
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;