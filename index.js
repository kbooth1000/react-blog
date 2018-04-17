const h = React.createElement;
const root = document.querySelector('.react-root');


let postBeingEdited = null;

let Greeting = ({
        name
    }) =>
    h('h1', {
        className: 'greeting'
    }, `Howdy, ${name}!`);

let Footer = ({
        copyright
    }) =>
    h('div', {
        className: 'footer'
    }, `Copyright ${copyright}`);

let Title = ({
        title
    }) =>
        h('h1', {
        className: 'title'
    }, title);

let Author = ({
        author
    }) =>
    h('h4', {
        className: 'author'
    }, author);

let Body = ({
        body
    }) =>
    h('p', {
        className: 'body'
    }, body);

let Image = ({
        imagepath
    }) =>
    h('img', {
        src: `${imagepath}`
    });
//  #################################




let DeletePostButton = ({
        id, deletePost
    }) =>
    h('button', {
        onClick: () => deletePost(id)
    }, 'Delete');

let updatePost = function (post, event) {
    console.log('post.body, value: ', post.body);
    postToEdit = posts.find(post => post.id === props.id);
    postToEdit.body = props.body;
    postBeingEdited = null;
}

// let updatePostBody = function ({post}, {posts}, value) {
//      let blogpost = posts.find(blogpost => blogpost.id === post.id);
//     console.log('post: ', post.body, value, (post === blogpost) );
//     post.body = value;
// }

let EditSubmitButton = post => h('button', {
    value: 'Submit',
    onClick: (event) => updatePost(post, event)
}, 'Save');

let PostEditField = ({post, posts, updatePostBody, postBeingEdited}) => h('textarea', {
    rows: '10',
    cols: '30',
    value: post.body //,
    // onChange: (event) => updatePostBody({post}, {postBeingEdited}, {posts}, event.target.value)
});

let EditPostButton = ({editPost, post}) => { 
return h('button', {
    onClick: () => editPost(post)
}, 'Edit');}

let PostEditForm = ({post, posts, postBeingEdited, editPost, updatePostBody}) => {
    console.log('PostEditForm: ', post.body);
    return h('form', {}, [
        h(PostEditField, {post, posts, updatePostBody, postBeingEdited}),
        h(EditSubmitButton, {post})
    ]);
}

let Post = (post, posts, postBeingEdited, editPost, deletePost) =>{ 
    console.log('post, posts, postBeingEdited, editPost: ',post, posts, postBeingEdited, editPost);
return h('section', null, [
    h(Title, post),
    h(Image, post),
    h(Body, post),
    h(Author, post),
    h(DeletePostButton, post, deletePost),
    h(EditPostButton, {editPost, post})
]);}

let PostList = ({posts, postBeingEdited, editPost, deletePost, updatePostBody }) => {
    return h('div', null, posts.map((post) => {
        if (postBeingEdited && post.id === postBeingEdited.id) {
            return h(PostEditForm, {post, posts, postBeingEdited, editPost, updatePostBody});
        } else {
            return h(Post,  {
                post, posts, postBeingEdited, editPost, deletePost
            });
        }
    }));
}




/// Page class   ######
class Page extends React.Component {
    constructor(allPosts) {
        super(allPosts);
        this.state = {
            postBeingEdited: null,
            posts: allPosts
        };
    }
    
    render() {
        // let {posts, postBeingEdited } = this.state;

        let updatePostBody = ({post}, {postBeingEdited}, {posts}, value) => {
            this.setState({
                postBeingEdited: Object.assign({}, post, value)
            });
        };

        let deletePost = function (id) {
            this.state.posts.setState( (post) => post.id === id);
            console.log('posts: ', posts);
        }

        let editPost = (post)=>{
            console.log('Edit this: ', post.body);
            this.setState({postBeingEdited : post});
        }

        return h('div', {
            className: 'container'
        }, [
            h(Greeting, {
                name: 'Louise'
            }),
            h(PostList, { 
                posts:this.state.posts.allPosts, 
                postBeingEdited:this.state.postBeingEdited,
                editPost:editPost,
                deletePost:deletePost,
                updatePostBody:updatePostBody
            }),
            h(Footer, {
                copyright: '2018'
            })
        ]);
    }
}

ReactDOM.render(
    h(Page, { allPosts:[{
        id: '1',
        title: 'My first blog post',
        author: 'Catfish McGee',
        imagepath: 'img/cmcgee.png',
        body: 'Well, let me tell you a little story. It all began...'
    },

    {
        id: '2',
        title: 'Sweet Potato Pie',
        author: 'Calpernia',
        image: 'img/calpernia.png',
        body: 'One of my favorite cold-weather dishes is sweet potato ...'
    }
] }), root
);