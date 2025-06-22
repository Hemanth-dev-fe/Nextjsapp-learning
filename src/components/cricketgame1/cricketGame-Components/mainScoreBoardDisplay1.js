"use client"
import { Button, Card, CardContent, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startSecondInnings } from "@/reduxtoolkit/reducers/cricScoreReducers"
function MainScoreBoardDisplay()
{
    const matchstarted=useSelector((state)=>state.cricScore.matchStarted)
    const currentInningIndex=useSelector((state)=>state.cricScore.currentInnings)
    const innings=useSelector((state)=>state.cricScore.innings)
    const completedovers=useSelector((state)=>state.cricScore.innings[currentInningIndex].completedOvers)
    const inningscompleted=useSelector((state)=>state.cricScore.inningsCompleted)
    const matchcompleted=useSelector((state)=>state.cricScore.matchCompleted)
    const winnermessage=useSelector((state)=>state.cricScore.winnerMessage)
    const dispatch=useDispatch()
    const handleSecondInnings=()=>{
        dispatch(startSecondInnings())
    }
    return(
        <>
        {
              matchstarted && (
                <>
                {!inningscompleted ? (
                    <>
                    <Typography sx={{marginTop:"20px",fontSize:"35px"}}>
                    Score: {innings[currentInningIndex].runs} / {innings[currentInningIndex].wickets}
                </Typography>
                <Typography sx={{marginTop:"20px",fontSize:"35px"}}>
                    Overs: {completedovers}
                </Typography>
                    </>
                ):
                (
                    <>
                    {currentInningIndex===1 && !matchcompleted ?
                    
                       (
                        <>
                          <Button variant="contained" onClick={handleSecondInnings}>
                            Start Second-Innings
                          </Button>
                        </>
                       ):(

                        <>
                            <Card sx={{marginTop:"30px",backgroundColor:"yellowgreen"}}>
                                <CardContent sx={{padding:"50px"}}>
                                <Typography sx={{color:"blue"}}>Team {winnermessage}</Typography>
                                <Typography sx={{color:"white"}}>Team One Score : {innings[0].runs} / {innings[0].wickets}</Typography>
                                <Typography sx={{color:"white"}}>Team Two Score : {innings[1].runs} / {innings[1].wickets}</Typography>
                                </CardContent>
                            </Card>
                        </>
                       )
                }
                    </>
                )
            
            }
                </>
              )
        }
        </>
    )
}
export default MainScoreBoardDisplay