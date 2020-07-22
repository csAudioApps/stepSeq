import React from 'react';
import Share from '../components/Share';
import Users from '../components/Users';
import "regenerator-runtime/runtime.js";
import * as Tone from "tone";

const HeaderContainer = () => {

  const synth = new Tone.Synth().toDestination();
  // const notes = ["C3", "C4", null, "C3", "Bb3", "C3", null, "Bb2" ];
  let playing = false;

  const synthPart = new Tone.Sequence( (time, note) => {
      synth.triggerAttackRelease(note, 0.1, time);
    }, ["C3", "C4", null, "C3", "Bb3", "C3", null, "Bb2" ]).start(0);
  
  // Tone.Transport.start()

  function handleClick(e) {
    // synth.triggerAttackRelease("C4", "8n");
    console.log('audio is ready')

    if (!playing) {
      Tone.Transport.start();
      playing = true;
    } 
    else {
      Tone.Transport.pause();
      playing = false;
    }
  }

  return (
    <div className="HeaderContainer">
      <button onClick={handleClick}>TOGGLE SICK BEATS</button>
      <Share />
      <Users />

    </div>
  )
}

export default HeaderContainer;