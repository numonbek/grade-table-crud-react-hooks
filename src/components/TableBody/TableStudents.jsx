import React from 'react';
import { nanoid } from 'nanoid';

import TableGrade from './TableGrade';

const TableStudents = (props) => {
  const { studentId, studentsMas, setStudents } = props;

  let { counter } = props;
  return (
    <React.Fragment>
      <tr>
        <td>{++counter}</td>
        <td>{studentId.fullName}</td>
        {studentId.date.map((item, i) => (
          <TableGrade
            key={nanoid()}
            item={item}
            studentId={studentId}
            studentsMas={studentsMas}
            setStudents={setStudents}
          />
        ))}
      </tr>
    </React.Fragment>
  );
};

export default React.memo(TableStudents);
