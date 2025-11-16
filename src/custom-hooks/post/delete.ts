import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import type { RootState } from '../../state-management/store/store'

const useDelete = () => {
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
            const data = await axios.delete(`/user/delete/post/${userState.id}/${pushPost.id}`)
            console.log("DATA FROM DELETE POST HANDLER", data)
            setLoading(false)
            navigate("/home");
        } catch (err) {
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
        deletePostHandler
    }
}

export default useDelete;