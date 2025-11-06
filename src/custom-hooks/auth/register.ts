import axios from "axios";
import React, { useState } from "react";

import { updateUser } from "../../state-management/createslice/user";


const useRegister = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("EVENT Name TRIGGERED", e)
        // if(!e.target.value) return
        setName(e.target.value)
    }
    const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("EVENT Email TRIGGERED", e)
        // if(!e.target.value) return
        setEmail(e.target.value)
    }
    const setUsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("EVENT Username TRIGGERED", e)
        // if(!e.target.value) return
        setUsername(e.target.value)
    }

    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const registerHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const data = await axios.post("/user", {
                name, email, username, password
            })

            setLoading(false)
            console.log("SERVER_DATA FROM REGISTER", data)
            updateUser(data)
        } catch(err: unknown) {
            setLoading(false)
            // if(instanceof err) {
                
            // }
            setError(err.message || "Something went wrong.")
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