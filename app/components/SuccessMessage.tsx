import React from 'react';
import styles from '../styles/Home.module.css';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className={styles.successPopup}>
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;
