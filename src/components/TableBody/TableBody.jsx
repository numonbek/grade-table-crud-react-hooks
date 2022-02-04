import React from 'react';
import { nanoid } from 'nanoid';
import TableStudents from './TableStudents';

const TableBody = (props) => {
  const { students, setStudents } = props;
  return (
    <React.Fragment>
      {students.map((student, num) => (
        <TableStudents
          key={nanoid()}
          studentId={student}
          studentsMas={students}
          setStudents={setStudents}
          counter={num}
        />
      ))}
    </React.Fragment>
  );
};

export default React.memo(TableBody);
