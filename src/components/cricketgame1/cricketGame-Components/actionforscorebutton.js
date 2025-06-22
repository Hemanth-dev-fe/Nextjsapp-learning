"use client"
import { useDispatch, useSelector } from "react-redux";
import DeliveryMapForScoreDisplay from "./delivermapforscoredisplay";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import "./actionforscorebutton.css";
import { useEffect, useState } from "react";
import { addBall, addExtras, addWickets, incrementRuns, reset, resetOverCompleted, startSecondInnings, startSimpleScoreCard} from "@/reduxtoolkit/reducers/cricScoreReducers"

function ActionForButton() {
  const matchstarted = useSelector((state) => state.cricScore.matchStarted);
  const inningscompleted = useSelector((state) => state.cricScore.inningsCompleted);
  const isovercompletd = useSelector((state) => state.cricScore.isOverCompletd);
  const currentInnings = useSelector((state) => state.cricScore.currentInnings);
  const [deliveries, setDeliveries] = useState([]);
  const[enableExtraRuns,setEnableExtraRuns]=useState(false)

const handleEnableExtras=(runsForWide=false,runsForNoBall=false)=>{
    setEnableExtraRuns(true)
    const isGullyCricketMode={
        enableExtraRunsForNoBall:runsForWide,
        enableExtraRunsForWide:runsForNoBall
    }
    dispatch(startSimpleScoreCard(isGullyCricketMode))
}
const handleNoExtras = () => {
    const extraRunsForWide = false;
    const extraRunsForNoBall = false;
    handleEnableExtras(extraRunsForWide, extraRunsForNoBall);
    setEnableExtraRuns(false);
  };
  
  const handleYesExtras = () => {
    const extraRunsForWide = true;
    const extraRunsForNoBall = true;
    handleEnableExtras(extraRunsForWide, extraRunsForNoBall);
    dispatch(incrementRuns(1));
    setEnableExtraRuns(false);
  };
  const handleEnableExtraRuns=()=>{
    return(
        <>
        <Dialog open={enableExtraRuns}>
            <DialogTitle>
                are want to enable runs for extras?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleYesExtras}>Yes</Button>
                <Button onClick={handleNoExtras}>No</Button>
            </DialogActions>
        </Dialog>
        </>
    )
  }
  const dispatch = useDispatch();

  const handleValidBall = () => {
    dispatch(addBall());
  };

  const handleDelivery = (outcome) => {
    setDeliveries((del) => [...del, outcome]);
  };

  const handleRuns = (runs) => {
    dispatch(incrementRuns(runs));
    handleValidBall();
    handleDelivery(runs);
  };

  const handleWickets = () => {
    dispatch(addWickets());
    handleValidBall();
    handleDelivery('W');
  };

  const handleReset = () => {
    dispatch(reset());
    setDeliveries([]);
  };

  const handleExtras = (type) => {
    handleEnableExtras()
    const extraType = type === "noBall" ? "NB" : type === "wide" ? "wd" : type;
    dispatch(addExtras({ type: extraType, runs: 1 }));
    handleDelivery(extraType);
    
    if (type !== "noBall" && type !== "wide") {
      handleValidBall();
    }
  };

//   const handleNoExtras=()=>{
//     const extraRunsForWide = false;
//     const extraRunsForNoBall = false;
//     handleEnableExtras(extraRunsForWide,extraRunsForNoBall)
//   }
//   const handleYesExtras=()=>{
//     const extraRunsForWide = true;
//     const extraRunsForNoBall = true;
//     handleEnableExtras(extraRunsForWide,extraRunsForNoBall)
//   }
  useEffect(() => {
    if (isovercompletd) {
      setDeliveries([]);
      dispatch(resetOverCompleted());
    }
  }, [isovercompletd, dispatch]);

  useEffect(() => {
    if (inningscompleted && currentInnings === 0) {
      dispatch(startSecondInnings());
    }
  }, [inningscompleted, currentInnings, dispatch]);

  useEffect(() => {
    setDeliveries([]);
  }, [currentInnings]);

  
  return (
    <>
      {matchstarted && !inningscompleted && (
        <>
          <DeliveryMapForScoreDisplay deliveries={deliveries} />
          <div style={{ padding: "50px" }}>
            <div className="button-contained1">
              <Button variant="contained" color="primary" className="button" onClick={() => handleRuns(0)}>
                DotBall
              </Button>
              {[1, 2, 3, 4, 6].map((ball, i) => (
                <Button key={i} variant="contained" color="primary" className="button" onClick={() => handleRuns(ball)}>
                  {ball}Run{ball > 1 ? "s" : ""}
                </Button>
              ))}
              <Button variant="contained" sx={{ backgroundColor: "red" }} className="button" onClick={() => handleWickets()}>
                Wicket
              </Button>
              <Button variant="contained" color="secondary" className="button" onClick={() => handleExtras("noBall")}>
                NoBall
              </Button>
              <Button variant="contained" color="secondary" className="button" onClick={() => handleExtras("wide")}>
                Wide
              </Button>
            </div>
            <div className="button-contained2">
              <Button variant="contained" sx={{ backgroundColor: "green" }} className="button" onClick={() => handleReset()}>
                Reset
              </Button>
            </div>
          </div>
          {handleEnableExtraRuns()}
        </>
      )}
    </>
  );
}

export default ActionForButton;