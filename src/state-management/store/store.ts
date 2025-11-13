import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../createslice/user'
import postReducer from '../createslice/post'


const store = configureStore({
    reducer: {
        users: userReducer,
        posts: postReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;