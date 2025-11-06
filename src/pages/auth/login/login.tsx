

import './login.css'


const login = () => (
    <div className='login_container'>
        <span>Login</span>
        <form>
            <input type="text" placeholder="username or email" />
            <input type="psw" placeholder="password" />
            <button type="submit">Login</button>
        </form>
    </div>
);

export default login;