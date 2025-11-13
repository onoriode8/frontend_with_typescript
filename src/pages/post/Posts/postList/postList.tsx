import React from "react";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import './postList.css'


interface PostListProps {
    id: number,
    title: string | null,
    description: string | null,
    pushIdToReducerHandler: (id: number, path: string) => void
}

const PostList: React.FC<PostListProps> = (props) => {
    console.log("POSTLIST", props)
    return (
        <div>
            {props.id && <div className="postList_container">
                <div>
                    <p>{props.title}</p>
                    <p>{props.description}</p>
                </div>
                <div>
                    <MdCreate onClick={() => props.pushIdToReducerHandler(props.id, '/update')} />
                    <MdDelete onClick={() => props.pushIdToReducerHandler(props.id, '/delete')} />
                </div>
            </div>}
        </div>
    );
}

export default PostList;