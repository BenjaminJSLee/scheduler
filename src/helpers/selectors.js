const getAppointmentsForDay = (state, day) => {
  if (!state.appointments || !state.days) return [];
  const { appointments } = state.days.find((obj) => obj.name === day) || {appointments: []};
  return appointments.map((id) => state.appointments[id]);
};
export default getAppointmentsForDay;