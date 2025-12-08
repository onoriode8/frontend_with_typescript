import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackendURL from '../../util/config';
import type { AppDispatch, RootState } from '../../state-management/store/store';
import { getUserPosts } from '../../state-management/createslice/post';


const useGetPosts = () => {
    const id = localStorage.getItem("sessionId")

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((u: RootState) => u.users.user)

    
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                setLoading(false)
                const userId = userState.id ? userState.id : id
                const response = await axios.get(`${BackendURL}/posts/${userId}`, {
                    withCredentials: true
                })
                console.log("response FROM FETCH POST HANDLER", response)
                setLoading(false)
                const data = {
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description
                }
                dispatch(getUserPosts(data)) //comment back on.
            } catch (err) {
                setLoading(false)
                if(axios.isAxiosError(err)) {
                    setError(err.response?.data || "Something went wrong")
                    console.error("ERROR OCCURRED", err)
                    setTimeout(() => {
                        setError("")
                    })
                }
            }
        }
        fetchPosts()
    }, []);

    return {
        error, loading
    }
}

export default useGetPosts;