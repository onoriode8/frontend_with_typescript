import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface PostSliceProps {
    id: number 
    title: string | null
    description: string | null
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
    posts: [
        {
            id: 1,
            title: "A Nice Book",
            description: "An Awesome Way Of Writing Books In Todays Days."
        },
        {
            id: 2,
            title: "A Nice Book",
            description: "An Awesome Way Of Writing Books In Todays Days."
        },
        {
            id: 3,
            title: "A Nice Book",
            description: "An Awesome Way Of Writing Books In Todays Days."
        },
        {
            id: 4,
            title: "A Nice Book",
            description: "An Awesome Way Of Writing Books In Todays Days."
        },
        {
            id: 5,
            title: "A Nice Book",
            description: "An Awesome Way Of Writing Books In Todays Days."
        },
        {
            id: 6,
            title: "A Nice Book",
            description: "An Awesome Way Of Writing Books In Todays Days."
        }
    ]
}

const postSlice = createSlice({
    name: "post",
    initialState: postState,
    reducers: {
        getUserPosts: (state, action: PayloadAction<PostSliceProps>) => {
            state.posts.push(action.payload)
        },
        pushPostHandler: (state, action: PayloadAction<PostSliceProps>) => {
        console.log("reducer", action)
            if(!state.pushPost.id) return
            const { id, title, description } = action.payload
            state.pushPost.id = id;
            state.pushPost.title = title
            state.pushPost.description = description
        }
    }
})

export const { getUserPosts, pushPostHandler } = postSlice.actions

export default postSlice.reducer;