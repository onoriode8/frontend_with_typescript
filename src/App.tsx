import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'


const Layout = React.lazy(() => import('./components/layout'))
const Login = React.lazy(() => import("./pages/auth/login/login"))
const Signup = React.lazy(() => import("./pages/auth/register/register"))
const Home = React.lazy(() => import("./pages/home/home"))
const Create = React.lazy(() => import("./pages/post/create/create"))
const Delete = React.lazy(() => import("./pages/post/delete/delete"))
const Update = React.lazy(() => import("./pages/post/update/update"))



function App() {
  return (
    <React.Fragment>
      <Layout />
      <Routes>
        <Route path="/" 
          element={<Suspense fallback={<p>Loading...</p>}><Login /></Suspense>} />
        <Route path="/signup" 
          element={<Suspense fallback={<p>Loading...</p>}><Signup /></Suspense>} />
        <Route path="/home" 
          element={<Suspense fallback={<p>Loading...</p>}><Home /></Suspense>} />
        <Route path="/create" 
          element={<Suspense fallback={<p>Loading...</p>}><Create /></Suspense>} />
        <Route path="/update" 
          element={<Suspense fallback={<p>Loading...</p>}><Update /></Suspense>} />
        <Route path="/delete" 
          element={<Suspense fallback={<p>Loading...</p>}><Delete /></Suspense>} />
      </Routes>
    </React.Fragment>
  )
}

export default App;