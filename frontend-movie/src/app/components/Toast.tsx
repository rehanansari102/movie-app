import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  duration: number;
}

const Toast: React.FC<ToastProps> = ({ message, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
        display: visible ? 'block' : 'none',
      }}
    >
      {message}
    </div>
  );
};

export default Toast;