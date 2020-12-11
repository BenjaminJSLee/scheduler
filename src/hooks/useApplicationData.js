import { useState, useEffect } from 'react';
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({...state, day});

  const updateSpots = (state, id, diff = 0) => {
    let newDay = state.days.find((day) => day.appointments.includes(id));
    newDay = {
      ...newDay,
      spots: newDay.spots + diff,
    };
    const days = state.days.map( (day) => {
      return day.id === newDay.id ? newDay : day;
    });
    return days;
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const add = !state.appointments[id].interview ? -1 : 0;
    const days = updateSpots(state, id, add);
    
    return axios.put(`/api/appointments/${id}`, {
      ...appointment,
    })
    .then((res) => {
      setState(prev => {
        return {
          ...prev,
          days,
          appointments,
        }
      });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state, id, 1);

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState(prev => {
          return {
            ...prev,
            days,
            appointments
          }
        });
      });
      
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ])
    .then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => {
        return {...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data};
      });
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;