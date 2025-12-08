import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import BackendURL from '../../util/config';
import type { RootState } from '../../state-management/store/store'

const useDelete = () => {
    // const id = localStorage.getItem("sessionId")

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()
    const pushPost = useSelector((p: RootState) => p.posts.pushPost)
    const userState = useSelector((u: RootState) => u.users.user)

    const deletePostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!pushPost.id) return
        try {
            setLoading(false)
            // const userId = user.id ? user.id : id
            const data = await axios.delete(`${BackendURL}/posts/delete/${userState.id}/${pushPost.id}`, {
                withCredentials: true
            });
            console.log("DATA FROM DELETE POST HANDLER", data)
            setLoading(false)
            navigate("/home");
        } catch (err) {
            setLoading(false);
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
        deletePostHandler
    }
}

export default useDelete;