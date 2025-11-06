import { NavLink } from 'react-router-dom'

import './header.css'


const header = () => (
    <ul className="headerContainer">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/create">Create Post</NavLink>
        <NavLink to="/delete">Delete Post</NavLink>
        <NavLink to="/update">Update Post</NavLink>
        <NavLink to="/logout">Logout</NavLink>
    </ul>
);

export default header;