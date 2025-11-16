import { NavLink } from 'react-router'
import { MdCreate } from "react-icons/md";
import { useSelector } from 'react-redux';

import type { RootState } from '../../state-management/store/store';

import './home.css'


const Home = () => {
    const userState = useSelector((u: RootState) => u.users.user)

    return (
        <div>
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
        </div>
    );
}

export default Home;