import React, { useState, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import BackendURL from './util/config';
import { updateUser } from './state-management/createslice/user'

import Loader from './pages/loader/spinner/spinner';
import type { RootState } from './state-management/store/store';

const Home = React.lazy(() => import("./pages/home/home"))
const Layout = React.lazy(() => import('./components/layout'))
const Login = React.lazy(() => import("./pages/auth/login/login"))
const Posts = React.lazy(() => import('./pages/post/Posts/posts'))
const Create = React.lazy(() => import("./pages/post/create/create"))
const Delete = React.lazy(() => import("./pages/post/delete/delete"))
const Update = React.lazy(() => import("./pages/post/update/update"))
const Signup = React.lazy(() => import("./pages/auth/register/register"))
const DeletePost = React.lazy(() => import("./pages/post/deletePost/deletePost"))
const UpdatePost = React.lazy(() => import("./pages/post/updatePost/updatePost"))


interface StorageProps {
  id: number
  title: string,
  description: string
}

interface Props {
  pass: () => void
}

function App(pass: Props) {
  // sessionStorage.removeItem('post')
  const id = localStorage.getItem("sessionId")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<{}>({})


  const parsedData = sessionStorage.getItem('post');
  const pushPost: StorageProps | null = parsedData ? JSON.parse(parsedData) : null

  // const postId = useSelector((p: RootState) => p.posts.pushPost)
  const user = useSelector((u: RootState) => u.users.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log("APP STATE", user, pass)

  useEffect(() => {
    if(user.id) return
    const GetUserDataWhenAccessTokenExpires = async () => {
      console.log("RUN")
      try {
        setIsLoading(true)
        const userId = user.id ? user.id : id
        const response = await axios.get(`${BackendURL}/get/data/api/access/token/expires/${userId }`, {
            withCredentials: true
        })

        console.log("RESPONSE FROM USE-EFFECT-APP", response)
        const data = {
          id: response.data.data.userId, 
          name: response.data.data.name, 
          email: response.data.data.email, 
          username: response.data.data.username, 
          posts: response.data.data.posts
        }
        setIsLoading(false);
        dispatch(updateUser(data))
      } catch(err: unknown) {
        setIsLoading(false);
        console.log("ERROR ", err)
        if(axios.isAxiosError(err)) {
          setError({ data: err.response?.data, status: err.response?.status })
          if(err.response?.status === 401 && err.response?.data === "Not Authenticated") {
              localStorage.removeItem("sessionId")
              navigate("/")
          }
        }
        setError({ data: err.response?.data, status: err.response?.status })
      }
    }

    GetUserDataWhenAccessTokenExpires();
  }, [user.id])

  
  return (
    <React.Fragment>
      {/* {error.length !== 0 ? <Loader /> : null} */}
      {/* {error.length !== 0 ? <p style={{color: "red", textAlign: "center", marginTop: "150px"}}>{error.data}</p> : null} */}
      {isLoading && <Loader />}
      {user.id ? <Layout userId={user.id} /> : null}
      {!user.id ? <Routes>
        <Route path="/" 
          element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
        <Route path="/signup" 
          element={<Suspense fallback={<Loader />}><Signup /></Suspense>} />
      </Routes> :
      <Routes>
        <Route path="/home" 
          element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
        <Route path={`/posts`}
          element={<Suspense fallback={<Loader />}><Posts /></Suspense>} />
        <Route path="/create" 
          element={<Suspense fallback={<Loader />}><Create /></Suspense>} />
        <Route path={`/delete`}
          element={<Suspense fallback={<Loader />}><DeletePost /></Suspense>} />
        <Route path={`/update`}
          element={<Suspense fallback={<Loader />}><UpdatePost /></Suspense>} />

        <Route path={`/update/${pushPost?.id}`} 
          element={<Suspense fallback={<Loader />}><Update pushPost={pushPost} /></Suspense>} />

        <Route path={`/delete/${pushPost?.id}`}
          element={<Suspense fallback={<Loader />}><Delete pushPost={pushPost} /></Suspense>} />
      </Routes>}
    </React.Fragment>
  ) 
}

export default App;