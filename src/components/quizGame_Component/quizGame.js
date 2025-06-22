"use client"
import { useDispatch, useSelector } from "react-redux";
import { nextQuestion, prevQuestion, showAnswer, resetGame, selectAnserCheckQuestion } from "@/reduxtoolkit/reducers/quizGameReducer";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useCallback, useEffect, useState, memo } from "react";
import PropTypes from "prop-types";


const QuizQuestions = memo(({ currentQuestion, handleSelectOption, handlePrevious, handleNextQuestion, openDialog, currentQuestionIndex }) => {
    
    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Dialog open={openDialog}>
                <DialogTitle>{currentQuestion.question}</DialogTitle>
                <DialogContent>
                    {currentQuestion.options.map((opt, i) => {
                        const isSelected = opt === currentQuestion.userAnswer;
                        return (
                            
                            <ul key={i} style={{listStyleType:"none"}}>
                                <li style={{margin:"10px"}}>
                                <Button
                                variant="outlined"
                                
                                onClick={() => handleSelectOption(opt)}
                                sx={{
                                    marginRight: "15px",
                                    width: "90px",
                                    fontSize: "12px",
                                    backgroundColor: isSelected ? "green" : "",
                                }}
                            >
                                {opt}
                            </Button>
                                </li>
                            </ul>
                            
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "yellow" }}
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: "orange" }}
                        onClick={handleNextQuestion}
                        disabled={currentQuestion.userAnswer === null}
                    >
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
});
QuizQuestions.displayName = "QuizQuestions";
QuizQuestions.propTypes = {
    currentQuestion: PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        userAnswer: PropTypes.string,
    }).isRequired,
    handleSelectOption: PropTypes.func.isRequired,
    handlePrevious: PropTypes.func.isRequired,
    handleNextQuestion: PropTypes.func.isRequired,
    openDialog: PropTypes.bool.isRequired,
    currentQuestionIndex: PropTypes.number.isRequired,
};

const QuizScoreCard = memo(({ score, questions, handleShowAnswers, handleReset }) => {
  
    return (
        <Box display="flex" justifyContent="center" alignItems="center" >
            <Card>
                <CardContent>
                    Total Score is: {score}/{questions.length}
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={handleShowAnswers}>Show Answers</Button>
                    <Button variant="contained" sx={{ backgroundColor: "red" }} onClick={handleReset}>Reset</Button>
                </CardActions>
            </Card>
        </Box>
    );
});
QuizScoreCard.displayName = "QuizScoreCard";
QuizScoreCard.propTypes = {
    score: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        userAnswer: PropTypes.string,
        answer: PropTypes.string.isRequired,
    })).isRequired,
    handleShowAnswers: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
};

const ShowQuizAnswers = memo(({ questions,handleReset }) => {

    return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Card>
                <CardHeader>Review the Answers</CardHeader>
                <CardContent>
                    {questions.map((val, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <div><span style={{ fontSize: "20px", color: "blue" }}>Question: </span>{val.question}</div>
                            <div><span style={{ fontSize: "20px", color: "lightgreen" }}>userAnswer: </span>{val.userAnswer}</div>
                            <div><span style={{ fontSize: "20px", color: "pink" }}>correctAnswer: </span>{val.answer}</div>
                        </div>
                    ))}
                </CardContent>
                <CardActions sx={{display:"flex", justifyContent:"center", alignItems:"center"}} >
                    <Button variant="contained" sx={{ backgroundColor: "red" }} onClick={handleReset}>Reset</Button>
                </CardActions>
            </Card>
        </Box>
    );
});
ShowQuizAnswers.displayName = "ShowQuizAnswers";
ShowQuizAnswers.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        userAnswer: PropTypes.string,
        answer: PropTypes.string.isRequired,
    })).isRequired,
    handleReset:PropTypes.func.isRequired,
};

function Quiz() {
    const questions = useSelector((state) => state.quiz.questions);
    const score = useSelector((state) => state.quiz.score);
    const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
    const showScore = useSelector((state) => state.quiz.showScore);
    const showAnswers = useSelector((state) => state.quiz.showAnswers);
    const [openDialog, setOpenDialog] = useState(true);
    const dispatch = useDispatch();
    const currentQuestion = questions[currentQuestionIndex];
   /*  const Email=useSelector((state)=>state.UserAuthLogin.email)
    const userName=useSelector((state)=>state.UserAuthLogin.userName) */
    
    useEffect(() => {
        if (showScore || showAnswers) {
            setOpenDialog(false);
        } else {
            setOpenDialog(true);
        }
    }, [showScore, showAnswers]);

    const handlePrevious = useCallback(() => {
       
        dispatch(prevQuestion());
    }, [dispatch]);

    const handleNextQuestion = useCallback(() => {
       
        dispatch(nextQuestion());
    }, [dispatch]);

    const handleSelectOption = useCallback((answer) => {
        
        dispatch(selectAnserCheckQuestion({ answer }));
    }, [dispatch]);

    const handleReset = useCallback(() => {
        
        dispatch(resetGame());
    }, [dispatch]);

    const handleShowAnswers = useCallback(() => {
        
        dispatch(showAnswer());
    }, [dispatch]);

    //backend data

    /* const handleSubmitScore = useCallback(async () => {
        try {
            const email = Email;
            const name = userName; // Ensure you are getting the name correctly
            console.log("Email:", email); // Log the email to check its value
            console.log("Name:", name); // Log the name to check its value
            if (!email || !name) {
                console.error("Email and name are required");
                return;
            }
            const response = await axios.post("https://mern-cricscorebackend.onrender.com/quiz/quiz/quiz-scoreposting", { email, name, score }); // Change username to name
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting quiz score:", error);
        }
    }, [score, Email, userName]);
    useEffect(() => {
        if (showScore) {
            handleSubmitScore();
        }
    }, [showScore, handleSubmitScore]); */


    //done
    if (showAnswers) return <ShowQuizAnswers questions={questions}
    handleReset={handleReset} />;

    return (
        <>
            <div>
                {showScore ? (
                    <QuizScoreCard
                        score={score}
                        questions={questions}
                        handleShowAnswers={handleShowAnswers}
                        handleReset={handleReset}
                    />
                ) : (
                    <QuizQuestions
                        currentQuestion={currentQuestion}
                        handleSelectOption={handleSelectOption}
                        handlePrevious={handlePrevious}
                        handleNextQuestion={handleNextQuestion}
                        openDialog={openDialog}
                        currentQuestionIndex={currentQuestionIndex}
                    />
                )}
            </div>
        </>
    );
}

export default Quiz;