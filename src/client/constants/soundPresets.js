const soundPresets = {
  bass: {
    volume: -12, // the oscillator volume set to -12dB
    oscillator: {
      type: 'square', // oscillator type to square wave
    },
    envelope: {
      attack: 0.02, // envelope attack set to 20ms
      release: 1, // envelope release set to 1s
    },
  },
};

export default soundPresets;
