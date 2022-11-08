import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubReducer } from "./github/github.slice";

export const store = configureStore({
    reducer: {
       app: githubReducer
    },
   
})

setupListeners(store.dispatch)                                    //need for refetchOnFocus

///создаем тип чтобы знать с какимми данными работать в стейте
export type RootState = ReturnType<typeof store.getState>