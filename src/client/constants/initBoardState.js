export const initialState = {
  instruments = [
    { 
      name: "Drums", soundPreset: "BasicDrumset", mono: null, legato: false, grid: 
        [ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ] 
    },
    { 
      name: "Bass", soundPreset: "ClassicBassSynth", mono: true, legato: true, grid: 
        [ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ] 
    },
    { 
      name: "Synth1", soundPreset: "SpaceySynth", mono: false, legato: false, grid:
        [ [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [] ] 
    },
  ],

  status = { 
    secsRemaining: 300,
    bpm: 120,
    isPlaying: false,
  },

  users = {
    'wsxk943KJk': { userName: '', instrumentSelected: 2, color: 'blue'},
    'asv543fgs': { userName: '', instrumentSelected: 3, color: 'red'},
  },


  local = {
    localUserId: 'wsxk943KJk',
    localScale: 0,
    seqLen: 16,
    // localOctaveStart: 'C2'
  }
}