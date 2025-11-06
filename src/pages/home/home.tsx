import { NavLink } from 'react-router-dom'
import { MdCreate } from "react-icons/md";

import './home.css'


const home = () => (
    <div className='home_container'>
        <div>
            <div>Welcome {}!</div>
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

export default home;