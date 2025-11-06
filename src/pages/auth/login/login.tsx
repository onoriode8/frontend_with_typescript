import useLogin from '../../../custom-hooks/auth/login';

import './login.css'


const Login = () => {
    const { error, loading, setPasswordHandler,
        loginHandler, setUserDataHandler } = useLogin()
    return (
        <div className='login_container'>
            {loading && <p>Loading...</p>}
            {error.length !== 0 ? <p>{error}</p>: null} 
            <span>Login</span>
            <form onSubmit={(e) => loginHandler(e)}>
                <input type="text" placeholder="username or email" 
                    onChange={(e) => setUserDataHandler(e)} />
                <input type="psw" placeholder="password" 
                    onChange={(e) => setPasswordHandler(e)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;