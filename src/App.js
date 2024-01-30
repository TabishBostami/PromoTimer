import "./App.css";
import { useEffect, useState } from "react";


function App() {
  const [barstyle, setBarStyle] = useState("bees");
  const styles = [
    "crosses",
    "jupiter",
    "piano",
    "dominos",
    "pie",
    "bees",
    "food",
    "floor",
    "wiggle",
    "bars",
    "bubbles",
    "ticTac",
    "zigZag",
    "stripes",
    "clouds",
    "aztec",
    "circuit",
  ];
  const [mode, setMode] = useState(true);
  const [prog, setProg] = useState(7.5 * 30);
  const changestyle = (e) => {
    setBarStyle(e.target.value);
  };

  const convertSecondsToHMS = (inputSeconds) => {
    const hours = Math.floor(inputSeconds / 3600);
    const minutes = Math.floor((inputSeconds % 3600)/60);
    const seconds = inputSeconds % 60;
    console.log(hours,minutes,seconds)
  
    const formattedHours = hours 
    const formattedMinutes = minutes 
    const formattedSeconds = seconds 
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };



  const handler = (e) => {
    const startSize = prog;
    const startPosition = e.pageX;
    console.log("startSize", startSize, "postion", startPosition);
    function onMouseMove(mouseMoveEvent) {
      if (
        startSize - startPosition + mouseMoveEvent.pageX <= 900 &&
        startSize - startPosition + mouseMoveEvent.pageX >= 0
      ) {
        setProg(startSize - startPosition + mouseMoveEvent.pageX);
      }
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  useEffect(() => {
    let intervalId
    if (mode === false && prog > 0) {
     intervalId = setInterval(() => {
        setProg(prog - 0.125);
        console.log(prog)
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [mode ,prog]);

  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${prog}px` }}
          className={`bar shadow ${barstyle}`}
        >
          <button id="dragslide" onMouseDown={handler}>
            {" "}
            {/* {(prog / 7.5).toFixed(1)} */}
            {convertSecondsToHMS(prog*8)}
            {" "}
          </button>
        </div>
      </div>

      <select className="selection" onChange={changestyle}>
        {styles.map((v, i) => {
          return (
            <option key={i} value={v}>
              {" "}
              {v}{" "}
            </option>
          );
        })}
      </select>
      <div className="customtimers ">
        <button className="selection" onClick={() => setProg(225)}>
          30min
        </button>
        <button
          className="selection"
          onClick={() => {
            setProg(450);
          }}
        >
          1hour
        </button>
        <button
          className="selection"
          onClick={() => {
            setProg(900);
          }}
        >
          2hour
        </button>
      </div>
      <div className="btncustom">
        <button className="selections" onClick={() =>
          setProg(prog - 15 * 7.5)}>
          -15min
        </button>
        <button
          className="selections"
          onClick={() => {
            setProg(prog + 15 * 7.5);
          }}
        >
          +15min
        </button>
      </div>
      <div
        className={mode ? "startbtn" : "pausebtn"}
        onClick={() => setMode(!mode)}
      > <h1>{mode?"Start":"Pause"}</h1>  </div>
      
    </>
  );
}

export default App;
