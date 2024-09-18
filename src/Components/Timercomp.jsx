import React, { useState, useEffect } from 'react';

const Timercomp = () => {
  const [seconds, setSeconds] = useState(60); // Initial countdown time in seconds
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    } else if (seconds === 0) {
      clearInterval(interval);
      alert('Time is up!');
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>Time Remaining: {formatTime(seconds)}</p>
      {/* <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Resume'}
      </button> */}
      {time ={ti}}
    </div>
  );
};

export default Timercomp;
