import React from "react";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import './postList.css'


interface PostListProps {
    id: number,
    title: string | null,
    description: string | null,
    pushIdToReducerHandler: (id: number, title: string, description: string, path: string) => void
} 

const PostList: React.FC<PostListProps> = ({ id, title, description, pushIdToReducerHandler }) => {
    return (
        <div>
            {id && <div className="postList_container">
                <div>
                    <p>{title}</p>
                    <p>{description}</p>
                </div>
                <div>
                    <MdCreate onClick={() => pushIdToReducerHandler(id, title, description, '/update')} />
                    <MdDelete onClick={() => pushIdToReducerHandler(id, title, description, '/delete')} />
                </div>
            </div>}
        </div>
    );
}

export default PostList;