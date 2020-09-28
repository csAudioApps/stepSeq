export const userInitState = {
  username: 'beatsmith519', instrumentSelected: 0, selectedScale: 0, color: 'red', isPlaying: false,
};

export const mainInitState = {
  instruments: [
    {
      name: 'Percussion Synth',
      soundPreset: 'BasicDrumset',
      mono: null,
      legato: false,
      grid:
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    },
    {
      name: 'Classic 808',
      soundPreset: 'BasicDrumset',
      mono: null,
      legato: false,
      grid:
      [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    },
    {
      name: 'Monobass',
      soundPreset: 'ClassicBassSynth',
      mono: true,
      legato: true,
      grid:
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    },
    {
      name: 'Spacey Poly',
      soundPreset: 'SpaceySynth',
      mono: false,
      legato: false,
      grid:
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    },
    {
      name: 'Meatwave',
      soundPreset: 'Meatwave',
      mono: false,
      legato: false,
      grid:
        [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    },
  ],

  status: {
    secsRemaining: 300,
    tempo: 120,
  },

  users: {

  },

  local: {
    localUserId: '12345',
    seqLen: 16,
    // localOctaveStart: 'C2'
  },
};

// export default mainInitState;

// eslint-disable-next-line no-unused-vars
// const exampleState = {
//   instruments: [
//     {
//       name: 'Drums',
//       soundPreset: 'BasicDrumset',
//       mono: null,
//       legato: false,
//       grid:
//         [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
//     },
//     {
//       name: 'Bass',
//       soundPreset: 'ClassicBassSynth',
//       mono: true,
//       legato: true,
//       grid:
//         [[1], [1], [1], [1], [1], [1], [1], [], [], [], [], [], [], [], [], []],
//     },
//     {
//       name: 'Synth1',
//       soundPreset: 'SpaceySynth',
//       mono: false,
//       legato: false,
//       grid:
//         [[], [], [], [], [], [1, 2, 3, 4, 5, 6], [], [], [], [], [], [], [], [], [], []],
//     },
//   ],

//   status: {
//     secsRemaining: 300,
//     bpm: 120,
//     isPlaying: false,
//   },

//   users: {
//     wsxk943KJk: {
//       userName: '', instrumentSelected: 2, color: 'blue', selectedScale: 0, isPlaying: true,
//     },
//     asv543fgs: {
//       userName: '', instrumentSelected: 0, color: 'red', selectedScale: 0, isPlaying: true,
//     },
//   },

//   local: {
//     localUserId: 'wsxsk943KJk',
//     // localScale: 0,
//     seqLen: 16,
//     // localOctaveStart: 'C2'
//   },
// };

// export const initialState3 = {
//   instruments: [
//     {
//       name: 'Drums',
//       soundPreset: 'BasicDrumset',
//       mono: null,
//       legato: false,
//       grid:
//         [[2], [5], [7], [], [], [], [4], [], [], [], [], [], [], [], [], []],
//     },
//     {
//       name: 'Bass',
//       soundPreset: 'ClassicBassSynth',
//       mono: true,
//       legato: true,
//       grid:
//         [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
//     },
//     {
//       name: 'Synth1',
//       soundPreset: 'SpaceySynth',
//       mono: false,
//       legato: false,
//       grid:
//         [[], [], [], [], [], [1, 2, 3, 4, 5, 6], [], [], [], [], [], [], [], [], [], []],
//     },
//   ],

//   status: {
//     secsRemaining: 300,
//     bpm: 120,
//     isPlaying: true,
//   },

//   users: {
//     wsxk943KJk: {
//       userName: '', instrumentSelected: 2, color: 'blue', selectedScale: 0,
//     },
//     asv543fgs: {
//       userName: '', instrumentSelected: 0, color: 'red', selectedScale: 0,
//     },
//   },

//   local: {
//     localUserId: 'wsxk943KJk',
//     // localScale: 0,
//     seqLen: 16,
//     // localOctaveStart: 'C2'
//   },
// };
