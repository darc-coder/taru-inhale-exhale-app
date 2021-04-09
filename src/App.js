import logo from './imageLogo.svg';
import tarunind from "./Assets/tarunind.png";
import taruninni from "./Assets/taruninni.png";
import './App.css';
import { useState } from 'react';
import { gsap } from "gsap";
import * as GIF from "gif.js.optimized/dist/gif";

function App() {
  const [breathinval, setbreathinval] = useState(2.5);
  const [breathoutval, setbreathoutval] = useState(3.5);
  const [currentText, setcurrentText] = useState('');
  const [t1, sett1] = useState(gsap.timeline({ repeat: 10, }));

  let div = document.createElement('div');
  div.id = 'circle';

  let setbreathin = (evt) => {
    div.style.animation = `App-logo-spin infinite ${breathinval}s linear`;
    setbreathinval(evt.target.value);
    settimeline(evt.target.value, breathoutval);
    t1.restart();
  }
  let setbreathout = (evt) => {
    setbreathoutval(evt.target.value);
    settimeline(breathinval, evt.target.value);
    t1.restart();
  }

  let currentlyIn = () => {
    setcurrentText("Inhale");
  }
  let currentlyOut = () => {
    setcurrentText("Exhale");
  }

  let settimeline = (inval, outval) => {
    t1.progress(0).clear();
    let newT1 = gsap.timeline({ repeat: 10, })
    newT1.to("#circle", {
      onStart: currentlyIn,
      duration: inval,
      scale: 1.5
    })
      .to("#circle", {
        onStart: currentlyOut,
        duration: outval,
        scale: 1
      });

    sett1(newT1);
  }

  window.onload = () => {
    settimeline(breathinval, breathoutval);
    t1.restart();


    let imageElement = document.getElementById('img1');
    let imageElement2 = document.getElementById('img2');
    let gifImageDiv = document.getElementById('taru-div');
    let imgbtn = document.getElementById('imgbtn');

    let tarugif = document.createElement('img');
    tarugif.className = "tarugif";

    gifImageDiv.appendChild(tarugif);
    console.log(imgbtn);
    imgbtn.addEventListener('click', () => {
      tarugif.classList.toggle('tarugifactive');
    })

    var gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: process.env.PUBLIC_URL + '/gif.worker.js'
    });

    gif.addFrame(imageElement);
    gif.addFrame(imageElement2);

    gif.on('finished', function (blob) {
      tarugif.src = URL.createObjectURL(blob);
    });

    gif.render();

  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" id='imgbtn' alt="Main-logo" />
        <div className="taru-div" id='taru-div'>
          <img src={tarunind} id='img1' className='taruimg' alt="mouse" />
          <img src={taruninni} id='img2' className='taruimg' alt="mouse2" />
        </div>
        <h1 className="main-heading"> Inhale-Exhale Exercise</h1>
        <div className="main-content" id='maincontent'>
          <div id='circle'>{currentText}</div>
        </div>
        <div className="bottom-controls">
          <span className="spanRow">
            <label htmlFor='breath-in-rate'>Breath - in rate : &nbsp; </label>
            <input type='text' value={breathinval} disabled />
          </span>
          <input id='breath-in-rate' type="range" name="gdas-range" className="gdas-range"
            min={2} max={10} step={0.1} value={breathinval} onChange={setbreathin} />

        </div>
        <div className="bottom-controls">
          <span className="spanRow">
            <label htmlFor='breath-out-rate'>Breath out rate : &nbsp; </label>
            <input type='text' value={breathoutval} disabled />
          </span>
          <input id='breath-in-rate' type="range" name="gdas-range" className="gdas-range"
            min={2} max={10} step={0.1} value={breathoutval} onChange={setbreathout} />
        </div>
      </div>
    </div>
  );
}

export default App;