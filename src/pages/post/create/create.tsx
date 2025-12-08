

import useCreatePost from '../../../custom-hooks/post/create';
import './create.css'


const Create = () => {
    const { error, loading, message,
        setTitleHandler, setDescriptionHandler, createPostHandler } = useCreatePost()
    return (
        <div className='create_container'>
            <form onSubmit={(e) => createPostHandler(e)}>
            {loading && <p style={{textAlign: "center"}}>Loading...</p>}
            {error.length !== 0 ? <p style={{textAlign: "center", color: "red"}}>{error}</p>: null} 
            <span>Create Post</span>
            <span>{message}</span>
                <div>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setTitleHandler(e)}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea onChange={(e) => setDescriptionHandler(e)}/>
                </div>
                <button type='submit'>Create Post</button>
            </form>
        </div>
    );
}

export default Create