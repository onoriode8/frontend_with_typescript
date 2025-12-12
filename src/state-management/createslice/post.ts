import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface PostSliceProps {
    id: number 
    title: string
    description: string
}

interface RootPost {
    pushPost: {
        id: number | null
        title: string | null
        description: string | null
    },
    posts: PostSliceProps[]
}

const postState: RootPost = {
    pushPost: {
        id: null,
        title: null,
        description: null
    },
    posts: []
}

const postSlice = createSlice({
    name: "post",
    initialState: postState,
    reducers: {
        getUserPosts: (state, action: PayloadAction<PostSliceProps>) => {
            state.posts.push(action.payload)
        },
        pushPostHandler: (state, action: PayloadAction<PostSliceProps>) => {
            const { id, title, description } = action.payload
            state.pushPost.id = id;
            state.pushPost.title = title
            state.pushPost.description = description
        }
    }
})

export const { getUserPosts, pushPostHandler } = postSlice.actions

export default postSlice.reducer;