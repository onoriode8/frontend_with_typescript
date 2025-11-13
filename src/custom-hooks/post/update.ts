import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import type { RootState } from '../../state-management/store/store'


const useUpdate = () => {
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const [error, setError] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const userState = useSelector((u: RootState) => u.users.user)
    const pushPost = useSelector((p: RootState) => p.posts.pushPost)
    const navigate = useNavigate();

    const updatePostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!pushPost.id) return
        try {
            setLoading(false)
            const data: string = await axios.patch(`/user/update/post/${userState.id}/${pushPost.id}`, {
                title, description
            })
            console.log("DATA FROM FETCH POST HANDLER", data)
            setLoading(false)
            setMessage(data)
            setTimeout(() => {
                navigate('/home')
            })
        } catch (err) {
            setLoading(false)
            setError("Something went wrong")
            console.error("ERROR OCCURRED", err)
            setTimeout(() => {
                setError("")
            })
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