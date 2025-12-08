import { NavLink } from 'react-router';

import Loader from '../../loader/spinner/spinner'
import useRegister from '../../../custom-hooks/auth/register';

import './register.css'


const Register = () => {
    const { error, loading, registerHandler, setNameHandler,
        setPasswordHandler, setEmailHandler, setUsernameHandler } = useRegister();

    return (
        <div className='signup_container'>
            {loading && <Loader />}
            {error.length !== 0 ? <p style={{color: "red"}}>{error}</p>: null} 
            <span>Signup</span>
            <form onSubmit={(e) => registerHandler(e)}>
                <input type="name" placeholder="name" 
                    onChange={(e) => setNameHandler(e)} />
                <input type="username" placeholder="username" 
                    onChange={(e) => setUsernameHandler(e)} />
                <input type="email" placeholder="email" 
                    onChange={(e) => setEmailHandler(e)}/>
                <input type="password" placeholder="password" 
                    onChange={(e) => setPasswordHandler(e)}/>
                <button type="submit">Signup</button>
                <p>Already have account owner ? <NavLink to="/">Login</NavLink></p>
            </form>
        </div>
    );
}

export default Register;