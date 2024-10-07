import React, { FC, ReactNode } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalBody}>
          {children}
        </div>
        <div className={styles.footer}>
          <button className={styles.closeModalButton} onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;


