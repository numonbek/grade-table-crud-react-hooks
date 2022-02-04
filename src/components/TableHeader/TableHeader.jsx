import React from 'react';
import { nanoid } from 'nanoid';
import dataDays from '../../data/data-days';

const TableHeader = () => {
  return (
    <React.Fragment>
      <tr>
        <th>No</th>
        <th>FIO Students</th>
        {dataDays.map((days) => (
          <th key={nanoid()}>{days.day}</th>
        ))}
      </tr>
    </React.Fragment>
  );
};

export default React.memo(TableHeader);
