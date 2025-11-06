
import useRegister from '../../../custom-hooks/auth/register';
import './register.css'


const Register = () => {
    const { error, loading, registerHandler, setNameHandler,
        setPasswordHandler, setEmailHandler, setUsernameHandler } = useRegister();

    return (
        <div className='signup_container'>
            <span>Signup</span>
            <form>
                <input type="text" placeholder="username" 
                    onChange={(e) => setUsernameHandler(e)} />
                <input type="text" placeholder="email" 
                    onChange={(e) => setEmailHandler(e)}/>
                <input type="psw" placeholder="password" 
                    onChange={(e) => setPasswordHandler(e)}/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Register;