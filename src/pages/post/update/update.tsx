import Loader from '../../loader/spinner/spinner'
import useUpdate from '../../../custom-hooks/post/update';


import './update.css'


interface Props {
  pushPost: {
    id: number
    title: string,
    description: string
  } | null
}

const Update: React.FC<Props> = (props) => {
    const { error, loading, message, setTitleHandler,
        updatePostHandler, setDescriptionHandler } = useUpdate();
    
    return (
        <div>
            <div className='updatePost_container'>
                {!message.length !== 0 ? <p style={{color: "green"}}>{message}</p> : null}
                {loading && <Loader />}
                {error.length !== 0 ? <p style={{textAlign: "center", color: "red"}}>{error}</p>: null}
                <p>You sure you want to update ?</p>
                <form onSubmit={(e) => updatePostHandler(e)}>
                    <div>
                        <label>Title</label>
                        <input type="text" placeholder={`${props.pushPost?.title}`} 
                            onChange={(e) => setTitleHandler(e)}/>
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" placeholder={`${props.pushPost?.description}`} 
                            onChange={(e) => setDescriptionHandler(e)} />
                    </div>
                    <button type="submit">Update Post</button>
                </form>
            </div> 
        </div>
    );
}

export default Update;