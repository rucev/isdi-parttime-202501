import getHomePosts from "./getHomePosts";
import deletePost from "./deletePost";
import getAllPosts from "./getAllPosts";
import getPostsByAuthor from "./getPostsByAuthor";
import publishPost from "./publishPost";
import toggleLike from "./toggleLike";
import createComment from "./createComment";


const posts = {
    getAllPosts,
    publishPost,
    toggleLike,
    getPostsByAuthor,
    deletePost,
    getHomePosts,
    createComment
}

export default posts