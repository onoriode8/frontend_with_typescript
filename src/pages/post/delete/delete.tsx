import useDelete from '../../../custom-hooks/post/delete'

import './delete.css'


const DeletePost = () => {
    const { error, loading, deletePostHandler } = useDelete()
    return (
        <div>
            <div className="deletePost_container">
                <p>You sure you want to delete ?</p>
                <div>
                    <p>{}</p>
                    <p>{}</p>
                </div>
                <button type="submit">Delete Post</button>
            </div>
        </div>
    );
}

export default DeletePost;