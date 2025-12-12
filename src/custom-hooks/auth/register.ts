import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { updateUser } from "../../state-management/createslice/user";
import type { AppDispatch } from "../../state-management/store/store";


const useRegister = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const setUsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(loading) return
        if(name.length < 4 || password.length < 5 || email.length < 8 || username.length < 4) return 
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_BackendURL}/create/account/user`, {
                name, email, username, password
            }, {
                withCredentials: true
            })
            setLoading(false)
            const data = {
                id: response.data.userData.id, 
                name: response.data.userData.name, 
                email: response.data.userData.email, 
                username: response.data.userData.username,
                posts: response.data.userData.posts
            }
            dispatch(updateUser(data))
            localStorage.setItem("sessionId", response.data.userData.id)
            navigate("/home")
        } catch (err) {
            setLoading(false)
            if(axios.isAxiosError(err)) {
                setError(err.response?.data)
                setTimeout(() => {
                    setError("")
                }, 3000);
            }
        }
    }

    return { 
        error, loading, setPasswordHandler,
        registerHandler, setNameHandler,
        setEmailHandler, setUsernameHandler
    }
}


export default useRegister;