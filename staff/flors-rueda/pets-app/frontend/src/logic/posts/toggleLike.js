import data from "../../data";

const toggleLike = (postId) => {
    let loggedUserId;
    if (localStorage.id) {
        loggedUserId = JSON.parse(localStorage.getItem('id'));
    } else {
        loggedUserId = JSON.parse(sessionStorage.getItem('id')); //comprobar si se ha guardado el id de un usuario loggeado
    }

    const post = data.posts.findPostById(postId)

    if (!post.likes) post.likes = [];

    const userIndex = post.likes.indexOf(loggedUserId)

    if (userIndex !== -1) {
        post.likes.splice(userIndex, 1);
    } else {
        post.likes.push(loggedUserId)
    }

    data.posts.updatePostById(postId, post)

}

export default toggleLike