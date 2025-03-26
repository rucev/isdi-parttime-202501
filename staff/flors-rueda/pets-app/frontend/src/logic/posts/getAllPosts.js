import data from "../../data";

const getAllPosts = () => {
    let loggedUserId;
    if (localStorage.id) {
        loggedUserId = JSON.parse(localStorage.getItem('id'));
    } else {
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //comprobar si se ha guardado el id de un usuario loggeado
    }

    const posts = data.posts.retrievePosts()

    if (posts.length > 0) posts.sort((item1, item2) => new Date(item2.createdOn) - new Date(item1.createdOn))

    for (let i = 0; i < posts.length; i++) {
        const author = data.users.findUserById(posts[i].author)
        posts[i].author = author.username
        const date = new Date(posts[i].createdOn)
        posts[i].createdOn = date.toLocaleString()
        if (!posts[i].likes) posts[i].likes = []; //para manejar posts sin arrays de likes
        if (posts[i].likes.length > 0 && posts[i].likes.includes(loggedUserId)) {
            posts[i].isLiked = true
        } else {
            posts[i].isLiked = false
        }

    }

    return posts
}

export default getAllPosts