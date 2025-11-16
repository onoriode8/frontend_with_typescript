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
    posts: [
        {
            id: 1,
            title: "Reactjs",
            description: "An Awesome Way Of Writing Books In Todays Days."
        },
        {
            id: 2,
            title: "Nodejs",
            description: "Nodejs Application."
        },
        {
            id: 3,
            title: "React Native",
            description: "React Native is awesome love to work with the framework again."
        },
        {
            id: 4,
            title: "Prisma",
            description: "Prisma works well with typescript and mysql."
        },
        {
            id: 5,
            title: "Zod",
            description: "Trying zod next with typescript for input validation."
        },
        {
            id: 6,
            title: "PayStack",
            description: "I can't wait to work with paystack and know everything about payment gateway with backend apps."
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
        console.log("reducer from pushPostHandler", action)
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