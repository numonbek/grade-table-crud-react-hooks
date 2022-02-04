import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import dataDays from '../../data/data-days';
import Modal from '../Modal/Modal';

const initialState = {
  fullName: '',
  day: '',
  grade: '',
  isChecked: false,
};

const TableGrade = (props) => {
  const { studentId, item, studentsMas, setStudents } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editFormData, setEditFormData] = useState(initialState);
  const [coord, setCoord] = useState({});

  const handleEditFormChange = (event) => {
    const fieldIsChecked = event.target.checked;
    const fieldValue = event.target.value;

    let newFormData = { ...editFormData };
    newFormData.isChecked = fieldIsChecked;
    if (newFormData.isChecked) {
      newFormData.grade = 'н';
    } else {
      newFormData.grade = '';
    }
    if (event.target.type !== 'checkbox') {
      newFormData.grade = fieldValue;
    }
    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    let newContacts = [...studentsMas];
    const index = studentsMas.findIndex((contact) => contact.id === editStudentId);
    const editedContact = {
      id: editStudentId,
      fullName: editFormData.fullName,
      date: newContacts[index].date.map((dat) =>
        dat.day == editFormData.day ? { ...dat, grade: editFormData.grade } : { ...dat },
      ),
      isChecked: editFormData.isChecked,
    };
    newContacts[index] = editedContact;
    setStudents(newContacts);
    setEditStudentId(null);
    setIsOpen(false);
    setEditFormData(initialState);
  };

  const handleEditClick = (event, student, item) => {
    event.preventDefault();
    setEditStudentId(student.id);
    const formValues = {
      fullName: student.fullName,
      day: item.day,
      grade: item.grade,
      isChecked: '',
    };
    setEditFormData(formValues);
  };

  const getCoords = (e) => {
    let coords = e.target.getBoundingClientRect();
    setCoord({ x: coords.x - coords.x / 2 + 70, y: coords.y + coords.height + 50 });
  };

  return (
    <React.Fragment>
      <td
        className={isOpen ? 'show' : 'grade'}
        key={nanoid()}
        onClick={(e) => (handleEditClick(e, studentId, item), setIsOpen(true), getCoords(e))}>
        {dataDays.map((el) => (el.day == item.day ? item.grade : ''))}
      </td>
      <>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          cordX={coord.x}
          cordY={coord.y}>
          <form onSubmit={handleEditFormSubmit} className="form">
            <div className="form-title">Поставить отметку</div>
            <div className="form-info">
              <div className="student">
                <div className="student-description">Студент:</div>
                <div className="student-fio">{editFormData.fullName}</div>
              </div>
              <div className="date student">
                <div className="date-description">Дата:</div>
                <div className="date-day student-fio">{editFormData.day}</div>
              </div>
            </div>
            <label className="input-block">
              <input
                type="checkbox"
                name="checkbox"
                className="checkbox"
                checked={editFormData.grade == 'н' ? true : false}
                onChange={handleEditFormChange}
              />
              <span className="input-title">Не присутствовал</span>
            </label>
            <input
              type="number"
              name="grade"
              min="1"
              max="5"
              className="number"
              onChange={handleEditFormChange}
              disabled={editFormData.isChecked}
              value={editFormData.grade == 'н' ? '' : editFormData.grade}
            />
            <div className="form-button">
              <button className="btn btn-submit" type="submit">
                Поставить отметку
              </button>
            </div>
          </form>
        </Modal>
      </>
    </React.Fragment>
  );
};

export default React.memo(TableGrade);
