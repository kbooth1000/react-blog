const root = document.querySelector('.react-root');

let Greeting = ({ person }) =>
    <h1 className="greeting">Hi {person}!</h1>
let Title = () => <h1>React Blog</h1>
let Footer = () => <footer>Copyright 2018</footer>

let DeletePostButton = ({ post, removePost }) =>
    <button
        className="delete-button"
        onClick={() => removePost(post)}
    >
        Remove Post
    </button>

let EditPostButton = ({ post, editPost }) =>
    <button
        onClick={() => editPost(post)}
    >
        Edit Post
    </button>

let EditPostForm = ({ post, postBeingEdited, updateTitle, updateBody, savePost }) =>
    <form><label>Title:
        <input key="1" value={postBeingEdited.title} onChange={(event) => updateTitle(postBeingEdited, event.target.value)} /></label><br />
        <label>Content:
        <textarea key="2" value={postBeingEdited.body} rows="10"
                style={{ width: '100%' }} onChange={(event) => updateBody(postBeingEdited, event.target.value)} /></label>
        <button key="3" onClick={() => savePost(postBeingEdited)}>Save</button>
    </form>

let Post = ({ post, postBeingEdited, removePost, editPost, updateTitle, updateBody, savePost }) =>
    <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <DeletePostButton post={post} removePost={removePost} />
        <EditPostButton post={post} editPost={editPost} />
        {
            postBeingEdited && post.id === postBeingEdited.id &&
            <EditPostForm
                post={post}
                postBeingEdited={postBeingEdited}
                updateTitle={updateTitle}
                updateBody={updateBody}
                savePost={savePost}
            />
        }
       
    </div>

let PostList = ({
    posts,
    postBeingEdited,
    removePost,
    editPost,
    updateTitle,
    updateBody,
    savePost
}) =>
    <div className="post-list">
        {
            posts.map(post => <Post key={post.id} post={post} postBeingEdited={postBeingEdited} removePost={removePost} editPost={editPost} updateTitle={updateTitle} updateBody={updateBody} savePost={savePost} />)
        }
    </div>

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            postBeingEdited: null
        };
    }
    
    fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(posts => {
                this.setState({ posts })
            })
    }
    
    componentDidMount() {
        this.fetchData();
    }

    render() {
        // let posts = this.state.posts;
        // let postBeingEdited = this.state.postBeingEdited;
        let { posts, postBeingEdited } = this.state;

        let removePost = (postToDelete) => {
            let { id } = postToDelete;
            let prunedPosts = this.state.posts.filter((post) => id !== post.id);
            this.setState({
                posts: prunedPosts
            });
        };

        let editPost = (postToEdit) => {
            this.setState({
                postBeingEdited: Object.assign({}, postToEdit)
            });
        };

        let updateTitle = (postToEdit, title) => {
            this.setState({
                postBeingEdited: Object.assign({}, postToEdit, { title })
            });
        };

        let updateBody = (postToEdit, body) => {
            this.setState({
                postBeingEdited: Object.assign({}, postToEdit, { body })
            });
        };

        let savePost = (postToEdit) => {
            let posts = this.state.posts.slice();
            let post = posts.find(post => post.id === postToEdit.id);
            Object.assign(post, postToEdit);
            this.setState({
                posts,
                postBeingEdited: null
            });
        };

        let refresh = () => {
            this.fetchData();
        }

        return (
            <div>
                <Title />
                <Greeting person="Louise" />
                <button onClick={refresh}>Refresh</button>
                <PostList
                    posts={posts}
                    postBeingEdited={postBeingEdited}
                    removePost={removePost}
                    editPost={editPost}
                    updateTitle={updateTitle}
                    updateBody={updateBody}
                    savePost={savePost}
                />
            </div>
        )
    }
}

ReactDOM.render(<Page />, root);