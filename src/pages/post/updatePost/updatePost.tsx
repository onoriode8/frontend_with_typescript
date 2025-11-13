import { useSelector, useDispatch } from 'react-redux'
import { MdCreate } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

import type { RootState, AppDispatch } from '../../../state-management/store/store'
import { pushPostHandler } from '../../../state-management/createslice/post'

import './updatePost.css'


const UpdatePost = () => {
    const postState = useSelector((p:RootState) => p.posts.posts)
    const pushPostState = useSelector((p:RootState) => p.posts.pushPost)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    console.log("CHECK", postState)
    const pushIdToReducerHandler = (id: number, path: string) => {
        console.log("clicked", id)
        const postId = id
        const data = {
            id: postId, //check later and debug where the error comming for page reload when navigated.
            title: pushPostState.title,
            description: pushPostState.description
        }
        dispatch(pushPostHandler(data))
        navigate(`/${path}/${postId}`)
    }
    return (
        <div>
            <h4 className="deletePost__h4">Update Post</h4>
            <div className="deletePost__mainContainer">
                {postState.map(p => 
                <div key={p.id} className="deletePost__container">
                    <div>
                        <p>Title: {p.title}</p>
                        <p>Description: {p.description}</p>
                    </div>
                    <div>
                        <IoMdArrowBack onClick={() => navigate(-1)} />
                        <MdCreate onClick={() => pushIdToReducerHandler(postState.id, '/update')} />
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default UpdatePost;