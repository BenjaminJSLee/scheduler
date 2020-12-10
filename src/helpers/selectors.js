const getAppointmentsForDay = (state, day) => {
  if (!state.appointments || !state.days) return [];
  const { appointments } = state.days.find((obj) => obj.name === day) || {appointments: []};
  return appointments.map((id) => state.appointments[id]);
};

const getInterview = (state, interview) => {
  if (!state.interviewers || !interview) return null;
  const interviewer = state.interviewers[interview.interviewer] || null;
  return interviewer && { student: interview.student, interviewer};
};

export {
  getAppointmentsForDay, 
  getInterview,
};