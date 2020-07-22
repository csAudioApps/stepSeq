
state = {
  // global state
  instruments = [
    { name: "Drums", soundPreset: "BasicDrumset", mono: null, legato: false, grid: 
      [
        [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
      ],
    },

    { 
      name: "Bass", soundPreset: "ClassicBassSynth", mono: true, legato: true, grid: 
        [ [2], [3], [4], [], [0], [], [], [], [], [2], [], [0], [], [0], [1], [2] ] 
    },
    { name: "Synth1", soundPreset: "SpaceySynth", mono: false, legato: false, grid:
        [ [2, 5], [3, 6], [4, 6], [], [0, 6], [], [], [], [], [2, 5], [], [0, 6], [], [0], [1, 3], [2, 5] ] 
    },
  ],

  status = { 
    secsRemaining: 257,
    bpm: 120,
    isPlaying: true,
  },

  users = [
    { userId: 1, userName: 'Tom L', instrumentSelected: 2, color: 'blue'},
    { userId: 2, userName: 'Matt Gin', instrumentSelected: 2, color: 'green'},
  ],

  localState = {
    localUserId: 1,
    localScale: 0,
    // localOctaveStart: 'C2'
  }
}

const scales = [
  ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
  ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'B'],
  ['C', 'D', 'E', 'F#', 'G', 'A', 'B'],
  ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'],
  ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
  ['C', 'Db', 'Eb', 'F', 'Gb', 'Aa', 'Bb'],
],


    // { name: "Bass", soundPreset: "ClassicBassSynth", mono: true, legato: true, grid: 
    //   [
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    //     [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    //   ], 