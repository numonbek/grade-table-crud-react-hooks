import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data/data.json';
import TableHeader from './components/TableHeader/TableHeader';
import TableBody from './components/TableBody/TableBody';

const lett = localStorage.getItem('students');
localStorage.setItem('students', JSON.stringify(data));

function App() {
  const [students, setStudents] = useState(JSON.parse(lett));
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  return (
    <div className="table container">
      <h1 className="title">STUDENT GRADE TABLE</h1>
      <div className="table-inner">
        <table>
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            <TableBody students={students} setStudents={setStudents} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default React.memo(App);
