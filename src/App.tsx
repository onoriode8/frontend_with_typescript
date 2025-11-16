import React, { useEffect, Suspense } from 'react';
import { Routes, Route } from 'react-router'
import { useSelector } from 'react-redux'

import Loader from './pages/loader/spinner/spinner';
import type { RootState } from './state-management/store/store';

const Layout = React.lazy(() => import('./components/layout'))
const Login = React.lazy(() => import("./pages/auth/login/login"))
const Signup = React.lazy(() => import("./pages/auth/register/register"))
const Home = React.lazy(() => import("./pages/home/home"))
const Posts = React.lazy(() => import('./pages/post/Posts/posts'))
const Create = React.lazy(() => import("./pages/post/create/create"))
const Delete = React.lazy(() => import("./pages/post/delete/delete"))
const Update = React.lazy(() => import("./pages/post/update/update"))
const DeletePost = React.lazy(() => import("./pages/post/deletePost/deletePost"))
const UpdatePost = React.lazy(() => import("./pages/post/updatePost/updatePost"))


interface StorageProps {
  id: number
  title: string,
  description: string
}

function App() {
  // sessionStorage.removeItem('post')

  const parsedData = sessionStorage.getItem('post');
  const pushPost: StorageProps | null = parsedData ? JSON.parse(parsedData) : null

  // const postId = useSelector((p: RootState) => p.posts.pushPost)
  const user = useSelector((u: RootState) => u.users.user)

  //  console.log("APP STATE", postId)
  
  return (
    <React.Fragment>
      <Layout userId={user.id} />
      {user.id === null ? <Routes>
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