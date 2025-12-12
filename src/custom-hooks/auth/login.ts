import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { updateUser } from "../../state-management/createslice/user";
import type { AppDispatch } from "../../state-management/store/store";


const useLogin = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [userData, setUserData] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const setUserDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(e.target.value)
    }

    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(loading) return
        if(userData.length < 4 || password.length < 5) return 
        try {
            setLoading(true)
            const response = await axios.post(`${process.env.REACT_APP_BackendURL}/login/user`, {
                userData, password
            }, {
                withCredentials: true
            })
            setLoading(false)
            const data = {
                id: response.data.user.id, 
                name: response.data.user.name, 
                email: response.data.user.email, 
                username: response.data.user.username,
                posts: response.data.user.posts
            }
            dispatch(updateUser(data))
            localStorage.setItem("sessionId", response.data.user.id)
            navigate("/home")
        } catch(err) {
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
        loginHandler, setUserDataHandler
    }
}


export default useLogin;