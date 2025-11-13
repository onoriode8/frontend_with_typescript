import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        console.log("CLICKED")
        try {
            setLoading(true)
            const data = await axios.post("http:localhost:5000/user/create/account", {
                name, email, username, password
            })
            setLoading(false)
            console.log("SERVER_DATA FROM REGISTER", data)
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
        registerHandler, setNameHandler,
        setEmailHandler, setUsernameHandler
    }
}


export default useRegister;