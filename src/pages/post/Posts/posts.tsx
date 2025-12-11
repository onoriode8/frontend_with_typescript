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

    let postsArray;
    if(postState.length !== 0) {
        const posts = postState.find(p => p);
        postsArray = posts
    }

    return (
        <div className='post_style'>
            {loading && <p>Loading...</p>}
                {error.length !== 0 ? <p>{error}</p>: null}
                {postsArray !== undefined ? postsArray.flatMap(p => 
                    <PostList key={p.id} creatorId={p.creatorId}
                        id={p.id} title={p.title} description={p.description} 
                        pushIdToReducerHandler={pushIdToReducerHandler} />)
                 : <p>Your Posts will Appear Here!</p>
                }
        </div>
    );
}

export default Posts;


{/* {postState.length !== 0 ? postState.flatMap((p) => {
                    console.log("map post", p, p.title, p.description, p.id)
                    { p.map(posts => <PostList key={posts.id} creatorId={posts.creatorId} p={posts}
                        id={posts.id} title={posts.title} description={posts.description} 
                        pushIdToReducerHandler={pushIdToReducerHandler} />)} */}

                    {/* <PostList key={p.id} creatorId={p.creatorId} p={p}
                    id={p.id} title={p.title} description={p.description} 
                    pushIdToReducerHandler={pushIdToReducerHandler} />
                })  */}