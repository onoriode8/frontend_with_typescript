import { useSelector, useDispatch } from 'react-redux'
import { MdDelete } from "react-icons/md";
import{ useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

import type { RootState, AppDispatch} from '../../../state-management/store/store'
import { pushPostHandler } from '../../../state-management/createslice/post'

import './deletePost.css'


const DeletePost = () => {
    const postState = useSelector((p: RootState)=> p.posts.posts)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const pushIdToReducerHandler = (id: number, path: string) => {
        console.log("clicked")
        const postId = id
        const data = {
            id: postId,
            title: postState.title,
            description: postState.description
        }
        dispatch(pushPostHandler(data))
        navigate(`/${path}/${postId}`);
    }

    return (
        <div>
            <h4 className="deletePost__h4">Delete Post</h4>
            <div className="deletePost__mainContainer">
                {postState.map(p => 
                <div key={p.id} className="deletePost__container">
                    <div>
                        <p>Title: {p.title}</p>
                        <p>Description: {p.description}</p>
                    </div>
                    <div>
                        <IoMdArrowBack onClick={() => navigate(-1)} />
                        <MdDelete onClick={() => pushIdToReducerHandler(p.id, '/delete')} />
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default DeletePost;