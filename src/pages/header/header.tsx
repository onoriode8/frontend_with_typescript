import { NavLink } from 'react-router'

import useLogoutHandler from '../../custom-hooks/auth/logout'

import './header.css'


interface headerProps {
    userId: number | null
}

const Header: React.FC<headerProps> = ({ userId }) => {
    const { logoutUserHandler } = useLogoutHandler();
    return (
        <div> 
            {userId !== null ? <ul className="headerContainer">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/create">Create Post</NavLink>
                <NavLink to="/posts">Posts</NavLink>
                <NavLink to={`/delete`}>Delete Post</NavLink>
                <NavLink to={`/update`}>Update Post</NavLink>
                <div onClick={logoutUserHandler}>Logout</div>
            </ul> :
            <ul className="headerContainer">
                <NavLink to="/">Login</NavLink>
                <NavLink to="/signup">Register</NavLink>
            </ul>}
        </div>
    );
}

export default Header;