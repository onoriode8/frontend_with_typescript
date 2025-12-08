import { createSlice, type PayloadAction } from '@reduxjs/toolkit'


interface PostsProps {
    id: number | null
    title: string | null
    description: string | null
    creatorId: number | null
}

export interface UserAction {
    id: number | null
    name: string | null
    email: string | null 
    username: string | null
    posts: PostsProps[] | null
}

interface UserProps {
    user: {
        id: number | null,
        name: string | null,
        email: string | null,
        username: string | null,
        posts: PostsProps[] | null
    }
}

const initialState: UserProps = {
    user: {
        id: null,
        name: null,
        email: null,
        username:  null,
        posts: [] 
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<UserAction>) => {
            if(!action.payload) return
            console.log("ACTION_PAYLOAD", action.payload);
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