import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(null);
  const [timer, setTimer] = useState(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setTime(2);
    setStatus('work');
    setTimer(setInterval(() => {
      setTime(time => time - 1);
      if(time === 0){
        setStatus('rest');
      }
    }, 1000));
  };

  useEffect(() => {
    if(time === 0){
      if(status === 'work'){
        setStatus('rest');
        setTime(20);
      } else {
        setStatus('work');
        setTime(1200);
      }
    }
  }, [time]);

  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  };

  const playBell = () => {

  };

  const closeApp = () => {
    window.close();
  };

  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      { status === 'work' && (<img src="./images/work.png" />)}
      { status === 'rest' && (<img src="./images/rest.png" />)}
      { status !== 'off' && (
        <div className="timer">
          {formatTime(time)}
        </div>
      )}
      { status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      { status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
