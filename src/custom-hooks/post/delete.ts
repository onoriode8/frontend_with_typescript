import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import type { RootState } from '../../state-management/store/store'

const useDelete = () => {
    const sessionPushPostData = JSON.parse(sessionStorage.getItem("push-posts"));

    const [error, setError] = useState<unknown>()
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const pushPost = useSelector((p: RootState) => p.posts.pushPost)
    const userState = useSelector((u: RootState) => u.users.user)

    const deletePostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!pushPost.id && !sessionPushPostData.id) return
        const postId = pushPost.id !== null ? pushPost.id : sessionPushPostData.id
        try {
            setLoading(false);
            await axios.delete(`${process.env.REACT_APP_BackendURL}/posts/delete/${userState.id}/${postId}`, {
                withCredentials: true
            });
            
            setLoading(false)
            navigate("/home");
        } catch (err: unknown) {
            setLoading(false);
            if(axios.isAxiosError(err)) {
                setError(err.response?.data || "Something went wrong")
                setTimeout(() => {
                    setError()
                })
            }
        }
    }

    return {
        error, loading, 
        deletePostHandler
    }
}

export default useDelete;