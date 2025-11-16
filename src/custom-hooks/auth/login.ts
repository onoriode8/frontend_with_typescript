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
        try {
            setLoading(true)
            const data = await axios.post("http://localhost:5000/user/login", {
                userData, password
            })
            setLoading(false)
            console.log("SERVER_DATA FROM Login", data)
            dispatch(updateUser(data))
            navigate("/home")
            window.location.reload()
        } catch(err) {
            setLoading(false)
            setError("Something went wrong.")
            setTimeout(() => {
                setError("")
            }, 3000);
        }
    }

    return { 
        error, loading, setPasswordHandler,
        loginHandler, setUserDataHandler
    }
}


export default useLogin;