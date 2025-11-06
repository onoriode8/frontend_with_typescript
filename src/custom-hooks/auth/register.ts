import axios from "axios";
import { useState } from "react";

import { updateUser } from "../../state-management/createslice/user";


const useRegister = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [username, setUsername] = useState<string>("")

    const setNameHandler = (e: Event) => {
        console.log("EVENT Name TRIGGERED", e)
        // if(!e.target.value) return
        setName(e.target.value)
    }
    const setEmailHandler = (e: Event) => {
        console.log("EVENT Email TRIGGERED", e)
        // if(!e.target.value) return
        setEmail(e.target.value)
    }
    const setUsernameHandler = (e: Event) => {
        console.log("EVENT Username TRIGGERED", e)
        // if(!e.target.value) return
        setUsername(e.target.value)
    }

    const registerHandler = async (e: Event) => {
        e.preventDefault()
        try {
            setLoading(true)
            const data = await axios.post("/user", {
                name, email, username
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
        error, loading, 
        registerHandler, setNameHandler,
        setEmailHandler, setUsernameHandler
    }
}


export default useRegister;