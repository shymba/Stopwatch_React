import React, {useState} from 'react';
import Display from './Components/display';
import Buttons from './Components/buttons';

import './App.css';

function App() {

  const [time, setTime] = useState({ms:0, s:0, m:0, h:0}); 
  const [interv, setInterv] = useState(); 
  const [status, setStatus] = useState(0); 

  //not started = 0
  //started = 1
  //stoped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  let updateMs = time.ms;
  let updateS = time.s;
  let updateM = time.m;
  let updateH = time.h;

  const run = () => {
    if(updateM === 60) {
      updateH++;
      updateM = 0;
    }
    if(updateS === 60) {
      updateM++;
      updateS = 0;  
    }
    if(updateMs === 100) {
      updateS++;
      updateMs = 0;
    }
    updateMs++;
    return setTime({ms:updateMs, s:updateS, m:updateM, h:updateH})
  }

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();

  return (
    <div className="main center">
      <div className="container center">
        <Display time={time}/>
        <Buttons status={status} start={start} resume={resume} stop={stop} reset={reset} />
      </div>  
    </div>
  );
}

export default App;
