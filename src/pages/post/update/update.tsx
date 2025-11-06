

import './update.css'


const updatePost = () => (
    <div>
        <div>
            <p>You sure you want to update</p>
            <form>
                <div>
                    <label>title</label>
                    <input type="text" placeholder={``} />
                </div>
                <div>
                    <label>description</label>
                    <input type="text" placeholder={``} />
                </div>
                <button>Update Post</button>
            </form>
        </div>
    </div>
);

export default updatePost;