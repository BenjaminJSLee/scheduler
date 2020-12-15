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
export default reducer;
export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
};