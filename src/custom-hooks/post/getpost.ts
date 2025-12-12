import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../state-management/store/store';
import { getUserPosts } from '../../state-management/createslice/post';


const useGetPosts = () => {
    const id = localStorage.getItem("sessionId")

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((u: RootState) => u.users.user)

    
    useEffect(() => {
        if(!userState.id) return
        const fetchPosts = async() => {
            try {
                setLoading(false)
                const userId = userState.id ? userState.id : id
                const response = await axios.get(`${process.env.REACT_APP_BackendURL}/posts/${userId}`, {
                    withCredentials: true
                })

                setLoading(false);

                dispatch(getUserPosts(response.data.posts))
            } catch (err) {
                setLoading(false)
                if(axios.isAxiosError(err)) {
                    setError(err.response?.data || "Something went wrong")
                    setTimeout(() => {
                        setError("")
                    })
                }
            }
        }
        fetchPosts()
    }, [userState.id]);

    return {
        error, loading
    }
}

export default useGetPosts;