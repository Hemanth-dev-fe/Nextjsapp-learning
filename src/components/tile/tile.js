"use client"
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Tile() {
    const navigate = useRouter();

    const handleCardClick = (path) => {
        navigate.push(path);
    };

    return (
        <div style={{ display: "flex", gap: "20px" }}>
            <Card sx={{ width: 150, height: 170, margin: 2, cursor: 'pointer',backgroundColor:"yellow" }} onClick={() => handleCardClick('/hemanth/quiz')}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography align="center" sx={{ marginBottom: "10px" }}>
                        Quiz Game
                    </Typography>
                    <CardMedia>
                        <Image src="quiz.jpg" style={{ width: "100px",height:"100px" }} alt="Quiz Game" />
                    </CardMedia>
                </CardContent>
            </Card>
          
            {/* <Card sx={{ width: 150, height: 170, margin: 2, cursor: 'pointer',backgroundColor:"yellow" }}onClick={() => handleCardClick('/hemanth/gully-cricket')}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography align="center" sx={{ marginBottom: "10px" }}>
                        Cric Score
                    </Typography>
                    <CardMedia>
                        <img src="cricscore.jpg" style={{ width: "100px", height:"100px" }} alt="Cric Score" />
                    </CardMedia>
                </CardContent>
            </Card> */}
        </div>
    );
}

export default Tile;