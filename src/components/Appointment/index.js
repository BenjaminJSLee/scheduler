import React from 'react';

import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

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
      });
  };

  const remove = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
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
      { mode === SAVING && (
        <Status message="Saving" />
      )}
      { mode === DELETING && (
        <Status message="Deleting" />
      )}
      { mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete this appointment?" 
          onCancel={() => back()}
          onConfirm={() => remove()}
        />
      )}


    </article>
  );
};
export default Appointment;