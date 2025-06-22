"use client"
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField} from "@mui/material"
import { startMatch } from "@/reduxtoolkit/reducers/cricScoreReducers"
import "./startMatchConfiguration.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
function StartMatchConfiguration()
{
const matchStart=useSelector((state)=>state.cricScore.matchStarted)
const dispatch=useDispatch()

    const [MatchDetailsDialogOpen,setMatchDetailsDialogOpen]=useState(false)
    const[teamOneName,setTeamOneName]=useState("");
    const [teamTwoName,setTeamTwoName]=useState("")
    const[totalOversinfo,setTotalOversInfo]=useState(0)
    const[snackBarOpen,setSnackBarOpen]=useState(false)

     const parseTotalOvers=(input)=>{
        if(typeof input !=="string")
        {
            return 0
        }
        const cleanedInput=input.trim().replace(/[^0-9]/g,"")
        const totalovers=parseInt(cleanedInput,10)
        if(isNaN(totalovers)||totalovers<0)
        {
            return 0
        }
        return totalovers
     }

    const hadleStartMatch=()=>{
        if(teamOneName===""||
           teamTwoName===""||
           totalOversinfo===0||
           totalOversinfo===""||
           isNaN(totalOversinfo)
        )
        {
            handleSnackBar();
            
        }

        const newMatchDetails={
            newMatch:true,
            teamDetails:[
                {
                    name:teamOneName?teamOneName:"A",
                    totalPlayers:11,
                    players:[]
                },
                {
                    name:teamTwoName?teamTwoName:"B",
                    totalPlayers:11,
                    players:[]
                }
            ],
            currentInnings:0,
            totalOvers:parseTotalOvers(totalOversinfo)
        }
        dispatch(startMatch(newMatchDetails))
        handleCancel();
    }

   
    const handleSkip=(skip=null)=>{
        if(skip)
        {
            hadleStartMatch()
            handleSnackBar()
        }
        setMatchDetailsDialogOpen(false)
        setTeamOneName("")
        setTeamTwoName("")

    }
    const handleCancel=()=>{
        handleSkip()
    }
    const handleSnackBar = () => {
        setSnackBarOpen(true); // Set state to open the Snackbar
    };
    const handleCloseSnackbar=()=>{
        setSnackBarOpen(false)
    }
    const HandleSnackBar=()=>{
        return(
            <>
            <Snackbar open={snackBarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message="Starting match with default values"
        anchorOrigin={{vertical:"top",horizontal:"center"}}
        ContentProps={{
            style:{
                backgroundColor: 'grey',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            }
        }}
        
        />
            </>
        )
    }
    const MatchDetailsDialog=()=>{
        return(
            <>
            <Dialog open={MatchDetailsDialogOpen} onClose={handleCancel}>
                <DialogTitle>Enter Team Details</DialogTitle>
                <DialogContent>
                    <TextField 
                    label="Team One Name"
                    fullWidth
                    variant="standard"
                    margin="dense"
                    value={teamOneName}
                    onChange={(e)=>setTeamOneName(e.target.value)}
                    >
                    </TextField>
                    <TextField 
                    label="Team Two Name"
                    fullWidth
                    variant="standard"
                    margin="dense"
                    value={teamTwoName}
                    onChange={(e)=>setTeamTwoName(e.target.value)}
                    >
                    </TextField>
                    <TextField 
                    label="Total Overs"
                    fullWidth
                    variant="standard"
                    margin="dense"
                    value={totalOversinfo}
                    onChange={(e)=>setTotalOversInfo(e.target.value)}
                    >
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={()=>{handleSkip("skip")}}>Skip</Button>
                    <Button onClick={hadleStartMatch}>Start</Button>
                </DialogActions>
            </Dialog>
            </>
        )
    }
    const handleMatchDetailsDialog=()=>{
        setMatchDetailsDialogOpen(true)
    }
    return(
        <>
        {!matchStart &&(
            <>
            
        <div className="cricscorebody"> 
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Button variant="contained" color="primary" sx={{width:"100%",mb:2}}
              onClick={handleMatchDetailsDialog}
              >
                Start A New Match
              </Button>
        </Box>
        </div>
        
            </>

        )}
        {MatchDetailsDialog()}
        {HandleSnackBar()}
        </>
    )
}
export default StartMatchConfiguration