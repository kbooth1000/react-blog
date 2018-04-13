const h = React.createElement;
const root = document.querySelector('.react-root');

let posts = [{
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
];

let postBeingEdited = null;

let Greeting = ({
        name
    }) =>
    h('h1', { className: 'greeting' }, `Howdy, ${name}!`);

let Footer = ({
        copyright
    }) =>
    h('div', { className: 'footer' }, `Copyright ${copyright}`);

let Title = ({
        title
    }) =>
    h('h1', { className: 'title' }, title);

let Author = ({
        author
    }) =>
    h('h4', { className: 'author' }, author);

let Body = ({
        body
    }) =>
    h('p', { className: 'body' }, body);

let Image = ({
        imagepath
    }) =>
    h('img', { src: `${imagepath}` });

let Post = props => h('section', null, [
    h(Title, props),
    h(Image, props),
    h(Body, props),
    h(Author, props),
    h(DeletePostButton, props),
    h(EditPostButton, props)
]);
let deletePost = function (id) {
    posts = posts.filter((post) => post.id !== id);
    console.log('posts: ', posts);
    update();
}
let DeletePostButton = ({id}) =>
    h('button', {
        onClick: () => deletePost(id)
    }, 'Delete');

let updatePost = function (props) {
    console.log('props.body, value: ',  props.body);
    postToEdit = posts.find(post => post.id === props.id);
    postToEdit.body = props.body;
    postBeingEdited = null;
    update();
}

let updatePostBody = function (props, value) {
    let post = posts.find(post => post.id === props.id);
    console.log('post: ', post.body, value);
    post.body = value;
    update();
}

let EditSubmitButton = props => h('button', {
     value: 'Submit',  onClick: (event) => updatePost(props) 
}, 'Save');

let PostEditField = props => h('textarea', {rows:'10', cols:'30', value:props.body,
    onChange: (event) => updatePostBody(props, event.target.value)
});

let editPost = function (post) {
    console.log('Edit this: ', post.body);
    postBeingEdited = post;
    update();
}

let EditPostButton = props => h('button', {
    onClick: () => editPost(props)
}, 'Edit');

let PostEditForm = (props) => {console.log('PostEditForm: ', props.body);
return h('form', {}, [
        h(PostEditField, props),
        h(EditSubmitButton, props)
    ]);
}

let PostList = props =>
    h('div', null, props.posts.map((post) => {
        if (postBeingEdited && post.id === postBeingEdited.id) {
            return h(PostEditForm, post);
        } else {
            return h(Post, post);
        }
    })
);

let Page = props =>
    h('div', {
        className: 'container'
    }, [
        h(Greeting, {
            name: 'Louise'
        }),
        h(PostList, props),
        h(Footer, {
            copyright: '2018'
        })
    ])


let update = function () {
    ReactDOM.render(
        h(Page, {
            posts
        }),
        root
    );
}
update();