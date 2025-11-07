import { createSlice } from '@reduxjs/toolkit'

// interface UserProps {
//     id: number,
//     name: string,
//     email: string,
//     username: string,
//     posts: []
// }


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: null,
            name: null,
            email: null,
            username: null,
            posts: null
        }
    },
    reducers: {
        updateUser: (state, action) => {
            if(!action.payload) return
            const { id, name, email, username, posts } = action.payload
            state.user.id = id
            state.user.name = name
            state.user.email = email
            state.user.username = username
            state.user.posts = posts
        }
    }
});

export const { updateUser } = userSlice.actions;


export default userSlice.reducer