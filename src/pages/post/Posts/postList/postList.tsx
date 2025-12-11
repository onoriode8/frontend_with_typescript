import React from "react";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import './postList.css'


// interface PostListProps {
//     id: number,
//     title: string | null,
//     description: string | null,
//     pushIdToReducerHandler: (id: number, path: string) => void
// } : React.FC<PostListProps>

const PostList = ({ id, title, description, pushIdToReducerHandler }) => {
    console.log("POSTLIST", id, title, description, pushIdToReducerHandler)

    return (
        <div>
            {/* <p style={{marginTop: "500px"}}>HELLO POSTS</p> */}
            {id && <div className="postList_container">
                <div>
                    <p>{title}</p>
                    <p>{description}</p>
                </div>
                <div>
                    {/* <MdCreate onClick={() => pushIdToReducerHandler(id, '/update')} />
                    <MdDelete onClick={() => pushIdToReducerHandler(id, '/delete')} /> */}
                </div>
            </div>}
        </div>
    );
}

export default PostList;