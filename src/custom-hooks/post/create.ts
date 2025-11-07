import axios from 'axios'
import React, { useState } from 'react'



const useCreatePost = () => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [description, setDescription] = useState<string>("")


    const setTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const setDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const createPostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(title.length === 0 && description.length === 0) {
            return
        }
        try {
            setLoading(true)
            const data = await axios.post("/user/create/post", {
                title, description
            })
            console.log("DATA FROM CREATE POST HANDLER", data);
            setLoading(false)
        } catch(err) {
            setLoading(false)
            setError("Something went wrong")
            console.error("ERROR OCCURRED", err)
            setTimeout(() => {
                setError("")
            })
        }
    }

    return {
        error, loading,
        setTitleHandler, setDescriptionHandler, createPostHandler
    }
}

export default useCreatePost;