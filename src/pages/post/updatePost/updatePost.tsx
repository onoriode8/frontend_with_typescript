import { useSelector, useDispatch } from 'react-redux'
import { MdCreate } from "react-icons/md";
import { useNavigate } from 'react-router'
import { IoMdArrowBack } from "react-icons/io";

import type { RootState, AppDispatch } from '../../../state-management/store/store'
import { pushPostHandler } from '../../../state-management/createslice/post'

import './updatePost.css'


const UpdatePost = () => {
    const postState = useSelector((p:RootState) => p.posts.posts)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    
    const pushIdToReducerHandler = (id: number, title:string, description: string, path: string) => {
        const postId = id
        const data = {
            id: postId,
            title: title,
            description: description
        }
        dispatch(pushPostHandler(data))
        sessionStorage.setItem("post", JSON.stringify(data))
        const varPath = `${path}/${postId}`
        navigate(`${varPath}`)
        window.location.reload()
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
                        <MdCreate onClick={() => pushIdToReducerHandler(p.id, p.title, p.description, '/update')} />
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default UpdatePost;