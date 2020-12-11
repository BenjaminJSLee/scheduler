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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, {
      ...appointment,
    })
    .then((res) => {
      setState(prev => {
        const day = prev.days.find((day) => day.appointments.includes(id));
        if (!prev.appointments[id].interview) day.spots -= 1;
        return {
          ...prev,
          appointments
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
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        setState(prev => {
          const day = prev.days.find((day) => day.appointments.includes(id));
          day.spots += 1;
          return {
            ...prev,
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