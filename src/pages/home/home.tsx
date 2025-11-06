import { NavLink } from 'react-router-dom'
import { MdCreate } from "react-icons/md";
import { useSelector } from 'react-redux';

import './home.css'


const Home = () => {
    const userState = useSelector(u => u.users.user)
    return (
        <div className='home_container'>
            <div>
                <div>Welcome {userState.name}!</div>
                <p>Please click on the right icon to create post 👉</p>
            </div>
            <div>
                <NavLink to="/create">
                    <MdCreate title="Create Post"/>
                </NavLink>
                <NavLink to="/create">Create Post</NavLink>
            </div>
        </div>
    );
}

export default Home;