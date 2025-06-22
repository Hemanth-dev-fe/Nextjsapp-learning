"use client"
import { Box, Card, CardContent, Chip, Collapse, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function MatchDetails()
{
    const matchstarted=useSelector((state)=>state.cricScore.matchStarted)
    const teamDetails=useSelector((state)=>state.cricScore.teamDetails);
    const totalOvers=useSelector((state)=>state.cricScore.totalOvers);
    const target=useSelector((state)=>state.cricScore.target)
    const currentInnings=useSelector((state)=>state.cricScore.currentInnings)
    const isLongName=teamDetails.some((n)=>n.name.length>15)
    const[expand,setExpand]=useState(true)

    const handleExpandClick=()=>{
        setExpand(!expand)
    }
    
    return(
        <>
        {
           matchstarted &&(
            <>
            <Card
            sx={{
                width:305,
                height:expand?"auto":"65px",
                margin:1,
                
            }}
            >
                <CardContent
                sx={{
                    padding:expand?"16px":"8px",
                    margin:expand?"2px":"1px",
                    justifyContent:!expand?"center":"",
                    alignItems:!expand?"center":"",
                    height:!expand?"100%":""
                }}
                >
                
                <Box sx={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center",
                    padding:"2px",
                    margin:"2px"
                }}>
                         <Typography variant="h6" component="div" align="center">
                            Match Details
                         </Typography>
                         <IconButton onClick={handleExpandClick}>
                           {expand? <ExpandLessIcon/>:<ExpandMoreIcon/>}
                         </IconButton>
                </Box>
                  <Collapse in={expand} timeout="auto" unmountOnExit >
                  <Box
                  sx={{
                    display:"flex",
                  flexDirection:isLongName?"column":"row",
                  gap:2,
                  justifyContent:"center",
                  alignItems:"center",
                  marginTop:2
                  }}
                  >

                   <Chip 
                   label={teamDetails[0].name}
                   sx={{

                    backgroundColor:"lightgreen",
                    color:"white"
                   }}
                   >
                     
                   </Chip>
                   {
                        isLongName?
                        <Typography variant="h6" sx={{alignSelf:"center", margin:"0 16px"}}>VS</Typography>
                        :
                        <Typography variant="h6" sx={{margin:"0 16px"}}>VS</Typography>
                     }
                   <Chip 
                   label={teamDetails[1].name}
                   sx={{
                    backgroundColor:"lightgreen",
                    color:"white"
                   }}
                   >

                   </Chip>
                  </Box>
                    <Typography variant="h6" align="center" marginTop="25px" >
                      Total Overs: {totalOvers}
                    </Typography>
                    {
                        currentInnings>0 &&
                        <Typography variant="h6" align="center" marginTop="25px" >
                        Target: {target}
                        </Typography>
                    }
                  </Collapse>
                </CardContent>
                
            </Card>
            </>
           )
        }
        </>
    )
}
export default MatchDetails