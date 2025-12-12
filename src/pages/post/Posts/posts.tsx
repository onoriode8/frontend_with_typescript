import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import PostList from "./postList/postList";
import useGetPosts from '../../../custom-hooks/post/getpost';
import { pushPostHandler } from '../../../state-management/createslice/post'
import type { RootState, AppDispatch } from "../../../state-management/store/store";

import './posts.css';



const Posts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const postState = useSelector((p: RootState) => p.posts.posts);

    const { error, loading } = useGetPosts();


    const pushIdToReducerHandler = (id: number, title: string, description: string, path: string) => {
        const postId = id
        if(path === "/update") {
            const data = {
                id: postId,
                title: title,
                description: description
            }
            
            sessionStorage.setItem("push-posts", JSON.stringify(data));
            dispatch(pushPostHandler(data))
            navigate(`/update/${postId}`)
        } else {
            const data = {
                id: postId,
                title: title,
                description: description,
            }
            
            sessionStorage.setItem("push-posts", JSON.stringify(data));
            dispatch(pushPostHandler(data))
            navigate(`/delete/${postId}`);
        }
    }

    let postsArray = [];
    if(postState.length !== 0) {
        const posts = postState.find(p => p);
        postsArray = posts
    }

    return (
        <div className='post_style'>
            {loading && <p>Loading...</p>}
                {error.length !== 0 ? <p>{error}</p>: null}
                {postsArray.length !== 0 ? postsArray.flatMap(p => 
                    <PostList key={p.id} 
                        // creatorId={p.creatorId}
                        id={p.id} title={p.title} description={p.description} 
                        pushIdToReducerHandler={pushIdToReducerHandler} />)
                 : <p>Your Posts will Appear Here!</p>
                }
        </div>
    );
}

export default Posts;