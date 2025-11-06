
import './register.css'


const register = () => (
    <div className='signup_container'>
        <span>Signup</span>
        <form>
            <input type="text" placeholder="username" />
            <input type="text" placeholder="email" />
            <input type="psw" placeholder="password" />
            <button type="submit">Signup</button>
        </form>
    </div>
);

export default register;