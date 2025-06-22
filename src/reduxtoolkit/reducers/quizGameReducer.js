import {createSlice} from "@reduxjs/toolkit"
const shuffleArray=(array)=>{
    for(let i=array.length-1;i>0;i--)
    {
        let j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    return array

}
const quizCardSlice=createSlice(
    {
        name:"quiz",
        initialState:{
            questions:shuffleArray([
                {
                    question:"Who is the best cricketer of this generation?",
                    options:shuffleArray(["Virat","Dhoni","ABD","smith","Babar"]),
                    answer:"Virat",
                    userAnswer:null
                },
                {
                    question:"Who is often referred to as the 'King' of cricket?",
                    options:shuffleArray(["Virat","Rohit","williamson","smith","Babar"]),
                    answer:"Virat",
                    userAnswer:null
                },
                {
                    question:"Who has the highest number of runs in a single IPL season?",
                    options:shuffleArray(["Virat","Rohit","williamson","smith","Babar"]),
                    answer:"Virat",
                    userAnswer:null
                },
                {
                    question:"Who holds the record for the most centuries in a single calendar year in ODIs?",
                    options:shuffleArray(["Virat","Tendulkar","Rohit","Dravid","Dhawan"]),
                    answer:"Virat",
                    userAnswer:null
                },
                {
                    question:"Who is the only player to score a century on World Cup debut for India?",
                    options:shuffleArray(["Virat","Ganguly","williamson","smith","Tendulkar"]),
                    answer:"Virat",
                    userAnswer:null
                },
                {
                    question:"Who scored the fastest century in ODIs for India?",
                    options:shuffleArray(["Virat","Rohit","williamson","smith","Babar"]),
                    answer:"Virat",
                    userAnswer:null
                },
                {
                    question:"Who has the most runs in T20 internationals?",
                    options:shuffleArray(["Virat","Rohit","williamson","smith","Gayle"]),
                    answer:"Virat",
                    userAnswer:null
                },
                {
                    question:"What is Virat Kohli's highest individual score in Test cricket?",
                    options:shuffleArray(["233","235","259","545","100"]),
                    answer:"235",
                    userAnswer:null
                },
                {
                    question:"Which team did Virat Kohli captain in the Indian Premier League (IPL)?",
                    options:shuffleArray(["CSK","MI","DC","RCB","KKR"]),
                    answer:"RCB",
                    userAnswer:null
                },
                {
                    question:"Who having more social media following in india?",
                    options:shuffleArray(["Virat","Rohit","williamson","smith","Babar"]),
                    answer:"Virat",
                    userAnswer:null
                },])
            ,
            score:0,
            currentQuestionIndex:0,
            showScore:false,
            showAnswers:false
        },
        reducers:{
            nextQuestion:(state)=>{
                if(state.questions[state.currentQuestionIndex].userAnswer!==null)
                {
                    state.currentQuestionIndex +=1
                }
                if(state.currentQuestionIndex >= state.questions.length)
                {
                    
                    state.showScore = true;
                }
            },
            prevQuestion:(state)=>{
                if(state.currentQuestionIndex>0)
                {
                    state.currentQuestionIndex -=1
                }
            },
            showAnswer:(state)=>{
                state.showAnswers=true
            },
            resetGame:(state)=>{
                state.questions.forEach((val)=>val.userAnswer=null);
                state.score=0;
                state.currentQuestionIndex=0;
                state.showAnswers=false;
                state.showScore=false;
            },
            selectAnserCheckQuestion: (state, action) => {
                const { answer } = action.payload;
                const currentQuestion = state.questions[state.currentQuestionIndex];
                if (currentQuestion.userAnswer !== answer) {
                    if (currentQuestion.userAnswer === currentQuestion.answer) {
                        state.score -= 1;
                    }
                    currentQuestion.userAnswer = answer;
                    if (answer === currentQuestion.answer) {
                        state.score += 1;
                    }
                }
            }
        }
    }
);

export const{nextQuestion,prevQuestion,showAnswer,resetGame,selectAnserCheckQuestion}=quizCardSlice.actions
export default quizCardSlice.reducer