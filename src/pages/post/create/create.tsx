

import useCreatePost from '../../../custom-hooks/post/create';
import './create.css'


const Create = () => {
    const { error, loading,
        setTitleHandler, setDescriptionHandler, createPostHandler } = useCreatePost()
    return (
        <div className='create_container'>
            <form onSubmit={(e) => createPostHandler(e)}>
            {loading && <p>Loading...</p>}
            {error.length !== 0 ? <p>{error}</p>: null} 
            <span>Create Post</span>
                <div>
                    <label>Title</label>
                    <input type="text" onChange={(e) => setTitleHandler(e)}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea onChange={(e) => setDescriptionHandler(e)}/>
                </div>
                <button>Create Post</button>
            </form>
        </div>
    );
}

export default Create