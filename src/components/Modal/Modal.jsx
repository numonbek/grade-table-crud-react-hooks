import React, { useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './style.module.css';

const modalRoot = document.querySelector('#modal');

const Modal = (props) => {
  const { open, onClose, cordX, cordY } = props;
  const element = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    if (open) {
      modalRoot.appendChild(element);

      return () => {
        modalRoot.removeChild(element);
      };
    }
  });

  if (open) {
    return createPortal(
      <>
        <div className={style.modal_background} onClick={onClose}></div>,
        <div className={style.modal_card} style={{ left: cordX * 2, top: cordY / 2 }}>
          {props.children}
        </div>
      </>,
      element,
    );
  }
  return null;
};

export default Modal;
