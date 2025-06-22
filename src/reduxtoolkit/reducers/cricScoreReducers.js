import { createSlice } from "@reduxjs/toolkit";

const initialInnings = {
  runs: 0,
  wickets: 0,
  totalBallsBowled: 0,
  totalOvers: 0,
  completedOvers: 0,
  extras: {
    wide: 0,
    noBall: 0,
    legByes: 0,
    byes: 0,
  },
};

const initialState = {
  innings: [initialInnings, { ...initialInnings }],
  currentInnings: 0,
  totalOvers: 0,
  teamDetails: [
    {
      name: "",
      totalPlayers: 11,
      players: [],
    },
    {
      name: "",
      totalPlayers: 11,
      players: [],
    },
  ],
  matchStarted: false,
  matchCompleted: false,
  inningsCompleted: false,
  isOverCompletd: false,
  target: 0,
  isGullyCricketMode: {
    enableExtraRunsForWide: false,
    enableExtraRunsForNoBall: false,
  },
  batFirstTeamName: "",
  bowFirstTeamName: "",
  winnerMessage: "",
};

const calculateWinner = (state) => {
  const teamAScore = state.innings[0].runs;
  const teamBScore = state.innings[1].runs;
  if (teamAScore > teamBScore) {
    const runDifference = teamAScore - teamBScore;
    const runWord = runDifference === 1 ? "run" : "runs";
    state.winnerMessage = `${state.teamDetails[0].name} won by ${runDifference} ${runWord}`;
  } else if (teamAScore < teamBScore) {
    const runDifference = teamBScore - teamAScore;
    const runWord = runDifference === 1 ? "run" : "runs";
    // const oversLeft = state.totalOvers - state.innings[1].completedOvers;
    // const oversLeftWord = oversLeft === 1 ? "over" : "overs";
    state.winnerMessage = `${state.teamDetails[1].name} won by ${runDifference} ${runWord}  `;
    // and ${oversLeft} ${oversLeftWord} left.
   
  } else {
    state.winnerMessage = "Match Tied";
  }
};

const cricScoreSlice = createSlice({
  name: "cricscore",
  initialState,
  reducers: {
    startMatch: (state, action) => {
      state.matchStarted = action.payload.newMatch;
      state.teamDetails = action.payload.teamDetails;
      state.totalOvers = action.payload.totalOvers;
      state.currentInnings = action.payload.currentInnings;
      state.innings[0].totalOvers = action.payload.totalOvers;
      state.batFirstTeamName = action.payload.batFirstTeamName;
      state.bowFirstTeamName = action.payload.bowFirstTeamName;
    },
    addBall: (state) => {
      state.innings[state.currentInnings].totalBallsBowled += 1;
      const totalBallsBowled = state.innings[state.currentInnings].totalBallsBowled;
      const overs = Math.floor(totalBallsBowled / 6);
      const balls = totalBallsBowled % 6;
      const completedOvers = overs + balls / 10;
      state.innings[state.currentInnings].completedOvers = completedOvers;
      if (balls === 0 && totalBallsBowled !== 0) {
        state.isOverCompletd = true;
      }
      // Check if the total overs are completed
      if (state.totalOvers > 0 && completedOvers >= state.totalOvers) {
        if (state.currentInnings === 0) {
          state.inningsCompleted = true;
          state.target = state.innings[0].runs + 1;
          state.currentInnings = 1;
        } else if (state.currentInnings === 1) {
          state.inningsCompleted = true;
          calculateWinner(state);
          state.matchCompleted = true;
        }
      }
    },
    resetOverCompleted: (state) => {
      state.isOverCompletd = false;
    },
    incrementRuns: (state, action) => {
      state.innings[state.currentInnings].runs += action.payload;
      if (state.currentInnings === 1) {
        if (state.innings[1].runs >= state.target) {
          calculateWinner(state);
          state.inningsCompleted = true;
          state.matchCompleted = true;
        }
      }
    },
    addWickets: (state) => {
      state.innings[state.currentInnings].wickets += 1;
      // Check if 10 wickets are down
      if (state.innings[state.currentInnings].wickets === 10) {
        if (state.currentInnings === 0) {
          state.inningsCompleted = true;
          state.target = state.innings[0].runs + 1;
          state.currentInnings = 1;
        } else if (state.currentInnings === 1) {
          state.inningsCompleted = true;
          calculateWinner(state);
          state.matchCompleted = true;
        }
      }
    },
    setTarget: (state, action) => {
      state.innings[1].target = action.payload;
    },
    addExtras: (state, action) => {
      const { type, runs } = action.payload;
      if (state.isGullyCricketMode.enableExtraRunsForWide && state.isGullyCricketMode.enableExtraRunsForNoBall) {
        state.innings[state.currentInnings].extras[type] += 1;
        state.innings[state.currentInnings].extras[runs] += 1;
      }
    },
    startSimpleScoreCard: (state, action) => {
      state.isGullyCricketMode.enableExtraRunsForNoBall = action.payload.enableExtraRunsForNoBall;
      state.isGullyCricketMode.enableExtraRunsForWide = action.payload.enableExtraRunsForWide;
    },
    startSecondInnings: (state) => {
      state.currentInnings = 1;
      state.inningsCompleted = false;
      state.innings[1].totalOvers = state.totalOvers;
    },
    reset: (state) => {
      const matchStarted = state.matchStarted;
      const currentInnings = state.currentInnings;
      const teamDetails = state.teamDetails;
      const totalOvers = state.totalOvers;
      return {
        ...initialState,
        matchStarted,
        currentInnings,
        teamDetails,
        totalOvers,
      };
    },
  },
});

export const {
  startMatch,
  startSecondInnings,
  addBall,
  incrementRuns,
  addWickets,
  setTarget,
  addExtras,
  reset,
  resetOverCompleted,
  startSimpleScoreCard,
} = cricScoreSlice.actions;
export default cricScoreSlice.reducer;