import { configureStore } from "@reduxjs/toolkit";
// import ThemeReducer from "../reducers/ThemeSlice";
// import gameReducer from "../reducers/TicTocToereducer";
// import TextSlice from "../reducers/textanimation_tictoctoe_reducer"
// import MemoryReducer from "../reducers/memoryGameReducer"
import quizCardSlice from "../reducers/quizGameReducer"
import cricScoreSlice from "../reducers/cricScoreReducers"
// import UserAuthRegisterSlice from "../reducers/userRegister"
// import UserAuthLogin from "../reducers/userLogin"

// import React from "react"


// const ThemeReducer=React.lazy(()=>import("../reducers/ThemeSlice"))
// const gameReducer=React.lazy(()=>import("../reducers/TicTocToereducer"))
// const TextSlice=React.lazy(()=>import("../reducers/textanimation_tictoctoe_reducer"))
// const MemoryReducer=React.lazy(()=>import("../reducers/memoryGameReducer"))
// const quizCardSlice=React.lazy(()=>import("../reducers/quizGameReducer"))
// const cricScoreSlice=React.lazy(()=>import("../reducers/cricScoreReducers"))
// const UserAuthSlice=React.lazy(()=>import("../reducers/userAuthloginandlogoutcredentials"))
//react components only use lazy

const store=configureStore(
    {
        reducer:{
            // UserAuthLogin:UserAuthLogin,
            // UserAuthRegister:UserAuthRegisterSlice,
            // Theme:ThemeReducer,
            // game:gameReducer,
            // TextAnimation:TextSlice,
            // memory:MemoryReducer,
            quiz:quizCardSlice,
            cricScore:cricScoreSlice
        }
    }
);
export default store