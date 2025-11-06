

import './delete.css'


const deletePost = () => (
    <div>
        <div>
            <p>You sure you want to delete</p>
            <div>
                <p>{} title</p>
                <p>{} description</p>
            </div>
            <button>Delete Post</button>
        </div>
    </div>
);

export default deletePost;