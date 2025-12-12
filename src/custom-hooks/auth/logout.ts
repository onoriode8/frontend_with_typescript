import axios from 'axios'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import type { RootState } from '../../state-management/store/store';


function useLogoutHandler () {
    const id = localStorage.getItem("sessionId")

    // const [error, setError] = useState<unknown>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate();

    const user = useSelector((u: RootState) => u.users.user)


    const logoutUserHandler = async () => {
        try {
            setIsLoading(true);
            const userId = user.id ? user.id : id
            const response = await axios.get(`${process.env.REACT_APP_BackendURL}/logout/user/${userId}`, {
                withCredentials: true
            });
            
            if(response.status !== 200 && response.data !== "Logout successfully") {
                throw response.status
            }

            localStorage.removeItem("sessionId")
            navigate("/")
            window.location.reload()
        } catch (error: unknown) {
            setIsLoading(false);
            if(axios.isAxiosError(error)) {
                // setError(error.message)
            }
        }
    }

    return { isLoading, logoutUserHandler }
}

export default useLogoutHandler