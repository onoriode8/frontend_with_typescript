import { useSelector } from 'react-redux';

import useUpdate from '../../../custom-hooks/post/update';
import type { RootState } from '../../../state-management/store/store';


import './update.css'


const Update = () => {
    const { error, loading, message, setTitleHandler,
        updatePostHandler, setDescriptionHandler } = useUpdate();

    const pushPost = useSelector((p: RootState) => p.posts.pushPost)
console.log("UPDATE_POST COMPONENT", pushPost)
    return (
        <div>
            <div className='updatePost_container'>
                {message.length !== 0 ? message : null}
                {loading && <p style={{textAlign: "center"}}>Loading...</p>}
                {error.length !== 0 ? <p style={{textAlign: "center", color: "red"}}>{error}</p>: null}
                <p>You sure you want to update ?</p>
                <form onSubmit={(e) => updatePostHandler(e)}>
                    <div>
                        <label>title</label>
                        <input type="text" placeholder={`${pushPost.title}`} 
                            onChange={(e) => setTitleHandler(e)}/>
                    </div>
                    <div>
                        <label>description</label>
                        <input type="text" placeholder={`${pushPost.description}`} 
                            onChange={(e) => setDescriptionHandler(e)} />
                    </div>
                    <button type="submit">Update Post</button>
                </form>
            </div>
        </div>
    );
}

export default Update;