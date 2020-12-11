import React from 'react';

import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = (props) => {

  
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      });
  };

  const remove = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      { mode === EMPTY && (
        <Empty
          onAdd={() => transition(CREATE)}
        />
      )}
      { mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      { mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      { mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      { (mode === SAVING || mode === DELETING) && (
        <Status message={ mode === SAVING ? "Saving" : "Deleting"} />
      )}
      { mode === CONFIRM && (
        <Confirm
        message="Are you sure you would like to delete this appointment?" 
        onCancel={() => back()}
        onConfirm={() => remove()}
        />
        )}
      { (mode === ERROR_SAVE || mode === ERROR_DELETE) && (
        <Error 
          message={ mode === ERROR_SAVE ? "Failed to save to database" : "Failed to delete from database"}
          onClose={() => back()}
        />
      )}


    </article>
  );
};
export default Appointment;