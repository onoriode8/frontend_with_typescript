import Spinner from '../../loader/spinner/spinner'
import useDelete from '../../../custom-hooks/post/delete'

import './delete.css'

interface Props {
  pushPost: {
    id: number
    title: string,
    description: string
  }
}

const DeletePost = (props: Props) => {
    const { error, loading, deletePostHandler } = useDelete()
    return (
        <div>
            {error.length !== 0 ? <p style={{textAlign: "center"}}>{error}</p> : null }
            {loading && <Spinner /> }
            <form className="deletePost_container" onSubmit={(e) => deletePostHandler(e)}>
                <p>You sure you want to delete ?</p>
                <div>
                    <p>Title: {props.pushPost.title}</p>
                    <p>Description: {props.pushPost.description}</p>
                </div>
                <button type="submit">Delete Post</button>
            </form>
        </div>
    );
}

export default DeletePost;