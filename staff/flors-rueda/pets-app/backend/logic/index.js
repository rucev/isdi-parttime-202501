import createPost from "./posts/createPost.js";
import deletePost from "./posts/deletePost.js";
import getAllPosts from "./posts/getAllPosts.js";
import getAvatar from "./users/getAvatar.js";
import getUsername from "./users/getUsername.js";
import loginUser from "./users/loginUser.js";
import registerUser from "./users/registerUser.js";
import toggleLike from "./users/toggleLike.js";
import updateAvatar from "./users/updateAvatar.js";
import updateUsername from "./users/updateUsername.js";

export default {
    registerUser,
    loginUser,
    getUsername,
    updateUsername,
    getAvatar,
    updateAvatar,
    createPost,
    getAllPosts,
    toggleLike,
    deletePost

}