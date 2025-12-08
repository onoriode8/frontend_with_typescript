import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import BackendURL from '../../util/config';
import type { RootState } from '../../state-management/store/store';




const useCreatePost = () => {
    const id = localStorage.getItem("sessionId")

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string>("")
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
            console.log("DATA FROM CREATE POST HANDLER", data);
            setLoading(false)
        } catch(err) {
            setLoading(false)
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
        error, loading,
        setTitleHandler, setDescriptionHandler, createPostHandler
    }
}

export default useCreatePost;