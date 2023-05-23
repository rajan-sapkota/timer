import { useState, useRef } from 'react'

import './App.css'

const formatNumber=(number)=>{
  return number.toString().padStart(2,0);
}

function App() {
  const [count, setCount] = useState(25*60);
  const [action, setAction] = useState('Click begin');
  const [status, setStatus]=useState(false);
  const stopRef= useRef(null);

  const minutes= formatNumber(Math.floor(count/60));
  const seconds= formatNumber(count - minutes*60);

  const run =()=>{
    setAction("Running...")
    setStatus(true);
    if(stopRef.current==null){
    stopRef.current=setInterval(() => {
      
       setCount(count =>{
        if(count>=1){
        return count -1}
        else return 0;
    }
       )
    }
    , 1000);
  }}

  const pause=()=>{
    setStatus(false)
    setAction("Continue when ready")

    if(stopRef.current !== null){
    
    clearInterval(stopRef.current);
    stopRef.current=null; 
    }
  }

  const reset=()=>{
    

    pause();
    setAction("Click Begin")
    setCount(25*60);
  }
  return (
    <>
      
      {action}

      <h1>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </h1>
     
     {!status && <button onClick={run}>Begin</button>}
     {status &&<button onClick={pause}>Stop</button>}
     <button onClick={reset}>Reset</button>
    </>
  )
}

export default App
