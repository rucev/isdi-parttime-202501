import deleteUserById from "./deleteUserById";
import getUserAvatar from "./getUserAvatar";
import getUserIdByUsername from "./getUserIdByUsername";
import getUserUsername from "./getUserUsername";
import isUserLoggedIn from "./isUserLoggedIn";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import registerUser from "./registerUser";
import getRandomBio from "./getRandomBio";
import updateAvatar from "./updateAvatar";
import updateBio from "./updateBio";
import updateEmail from "./updateEmail";
import updatePassword from "./updatePassword";
import updateUsername from "./updateUsername";
import getUserBio from "./getUserBio";
import getUserMainInfo from "./getUserMainInfo";
import toggleFollow from "./toggleFollow";

const users = {
    getUserUsername,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    updateAvatar,
    updateBio,
    updateUsername,
    getUserAvatar,
    getUserBio,
    getUserIdByUsername,
    updatePassword,
    updateEmail,
    deleteUserById,
    getRandomBio,
    getUserMainInfo,
    toggleFollow
}

export default users