import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import PostList from "./postList/postList";
import useGetPosts from '../../../custom-hooks/post/getpost';
import { pushPostHandler } from '../../../state-management/createslice/post'
import type { RootState, AppDispatch } from "../../../state-management/store/store";



const Posts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const postState = useSelector((p: RootState) => p.posts.posts)
    const pushPostState = useSelector((p: RootState) => p.posts.pushPost)

    const { error, loading } = useGetPosts();


    const pushIdToReducerHandler = (id: number, path: string) => {
        console.log("clicked", id, path)
        const postId = id
        if(path === "/update") {
            const data = {
                id: postId,
                title: pushPostState.title,
                description: pushPostState.description
            }
            dispatch(pushPostHandler(data))
            navigate(`/update/${postId}`)
        } else {
            const data = {
                id: postId,
                title: pushPostState.title,
                description: pushPostState.description
            }
            dispatch(pushPostHandler(data))
            navigate(`/delete/${postId}`);
        }
    }

    console.log("", postState)

    return (
        <div>
            {loading && <p>Loading...</p>}
                {error.length !== 0 ? <p>{error}</p>: null} 
                {postState.length !== 0 ? postState.map(p => <PostList key={p.id} 
                    id={p.id} title={p.title} description={p.description} 
                    pushIdToReducerHandler={pushIdToReducerHandler}
            />) : null}
        </div>
    );
}

export default Posts;