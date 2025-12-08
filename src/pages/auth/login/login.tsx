import { NavLink } from 'react-router';

import Loader from '../../loader/spinner/spinner'
import useLogin from '../../../custom-hooks/auth/login';

import './login.css'


const Login = () => {
    const { error, loading, setPasswordHandler,
        loginHandler, setUserDataHandler } = useLogin()
    return (
        <div className='login_container'>
            {loading && <Loader />}
            {error.length !== 0 ? <p style={{color: "red"}}>{error}</p>: null} 
            <span>Login</span>
            <form onSubmit={(e) => loginHandler(e)}>
                <input type="text" placeholder="username or email" 
                    onChange={(e) => setUserDataHandler(e)} />
                <input type="password" placeholder="password" 
                    onChange={(e) => setPasswordHandler(e)} />
                <button type="submit">Login</button>
                <p>Don't have an account ? Create one <NavLink to="/signup">Signup</NavLink></p>
            </form>
        </div>
    );
}

export default Login;