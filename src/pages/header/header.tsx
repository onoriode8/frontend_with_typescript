import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import type { RootState } from '../../state-management/store/store'

import './header.css'


interface headerProps {
    userId: number | null
}

const Header: React.FC<headerProps> = ({ userId }) => {
    const pushPost = useSelector((p: RootState) => p.posts.pushPost);
    console.log("HEADER", pushPost)
    return (
        <div> 
            {userId !== null ? <ul className="headerContainer">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/create">Create Post</NavLink>
                <NavLink to="/posts">Posts</NavLink>
                <NavLink to={`/delete`}>Delete Post</NavLink>
                <NavLink to={`/update`}>Update Post</NavLink>
                <NavLink to="/logout">Logout</NavLink>
            </ul> :
            <ul className="headerContainer">
                <NavLink to="/">Login</NavLink>
                <NavLink to="/signup">Register</NavLink>
            </ul>}
        </div>
    );
}

export default Header;