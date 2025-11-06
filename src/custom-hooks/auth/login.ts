import axios from "axios";
import React, { useState } from "react";

import { updateUser } from "../../state-management/createslice/user";


const useLogin = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [userData, setUserData] = useState<string>("")
    const [password, setPassword] = useState<string>("")


    const setUserDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("EVENT setUserData TRIGGERED", e)
        // if(!e.target.value) return
        setUserData(e.target.value)
    }

    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const loginHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const data = await axios.post("/user/login", {
                userData, password
            })

            setLoading(false)
            console.log("SERVER_DATA FROM Login", data)
            updateUser(data)
        } catch(err) {
            setLoading(false)
            // if(instanceof err) {
                
            // }
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