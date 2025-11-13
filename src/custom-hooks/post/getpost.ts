import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../state-management/store/store';
import { getUserPosts } from '../../state-management/createslice/post';


const useGetPosts = () => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                setLoading(false)
                const data = await axios.get("/user/get/post/${userId}")
                console.log("DATA FROM FETCH POST HANDLER", data)
                setLoading(false)
                if(!data.data.includes("<!doctype html>")) return
                // dispatch(getUserPosts(data)) //comment back on.
            } catch (err) {
                setLoading(false)
                setError("Something went wrong")
                console.error("ERROR OCCURRED", err)
                setTimeout(() => {
                    setError("")
                })
            }
        }
        fetchPosts()
    }, []);

    return {
        error, loading
    }
}

export default useGetPosts;