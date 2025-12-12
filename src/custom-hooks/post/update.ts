import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import type { RootState } from '../../state-management/store/store'


const useUpdate = () => {
    const sessionPushPostData = JSON.parse(sessionStorage.getItem("push-posts"));

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [error, setError] = useState<unknown>()
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const userState = useSelector((u: RootState) => u.users.user)
    const pushPost = useSelector((p: RootState) => p.posts.pushPost)
    const navigate = useNavigate();

    const updatePostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!pushPost.id && !sessionPushPostData.id) return
        const postId = pushPost.id !== null ? pushPost.id : sessionPushPostData.id
        try {

            setLoading(true)
            const data = await axios.patch(`${process.env.REACT_APP_BackendURL}/posts/update/${userState.id}/${postId}`, {
                title, description
            }, {
                withCredentials: true
            })

            setLoading(false)
            if(data.data.status !== 200 && data.statusText !== "OK") {
                throw new Error("Failed to update. Please try again shortly.");
            }
            setMessage("Updated post")
            setTimeout(() => {
                navigate('/home');
            }, 3000);
        } catch (err: unknown) {
            setLoading(false)
            setTitle("")
            setDescription("")
            if(axios.isAxiosError(err)) {
                setError("Please try again shortly.")
                setTimeout(() => {
                    setError("")
                }, 3000)
            }
        }
    }

    const setTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const setDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    return {
        error, loading, message, setTitleHandler,
        updatePostHandler, setDescriptionHandler
    }
}

export default useUpdate;