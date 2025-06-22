"use client"
import ActionForButton from '../cricketGame-Components/actionforscorebutton';
import MainScoreBoardDisplay from '../cricketGame-Components/mainScoreBoardDisplay1';
import MatchDetails from "../cricketGame-Components/matchDetails"
import StartMatchConfiguration from '../cricketGame-Components/StartMatchConfiguration';


function HomePage()
{
    return(
        <>
        
        <div className="cricscore">
            <h4>Cric Score</h4>
            <StartMatchConfiguration/>
            <MatchDetails/>
            <MainScoreBoardDisplay/>
            <ActionForButton/>
        </div>
        
     
       
        </>
    )
}
export default HomePage