import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import BackendURL from '../../util/config';
import type { RootState } from '../../state-management/store/store';




const useCreatePost = () => {
    const id = localStorage.getItem("sessionId")

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [description, setDescription] = useState<string>("")

    const userState = useSelector((u: RootState) => u.users.user)

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
            const userId = userState.id ? userState.id : id 
            const data = await axios.post(`${BackendURL}/create/posts/${userId}`, { // add user id to the request
                title, description
            }, {
                withCredentials: true
            })
            
            if(data.status !== 200) {
                throw new Error(data.data)
            }
            setLoading(false)
            setTitle('')
            setDescription('')
            setMessage("Created a post");
            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch(err) {
            setLoading(false)
            setTitle('')
            setDescription('')
            if(axios.isAxiosError(err)) {
                setError(err.response?.data || "Something went wrong")
                console.error("ERROR OCCURRED", err)
                setTimeout(() => {
                    setError("")
                })
            }
        }
    }

    return {
        error, loading, message,
        setTitleHandler, setDescriptionHandler, createPostHandler
    }
}

export default useCreatePost;