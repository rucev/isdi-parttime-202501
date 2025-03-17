import { likeEmpty, likeFill } from "../icons.mjs";
import { createButton, createContainer, createTextContainer } from "../lib.mjs";
import { getAllPosts } from "../logics.mjs";

const postList = {
    mount: (parentNode, onLikePost) => {
        const posts = getAllPosts();
        const postsContainer = createContainer('posts')

        for (let i = 0; i < posts.length; i++) {
            const postContainer = createContainer('post-card');
            const authorAndDate = createTextContainer('p', `${posts[i].author} said on ${posts[i].createdOn}`, 'post-card__author')
            const postTitle = createTextContainer('h3', posts[i].title, 'post-card__title')
            const postDescription = createTextContainer('p', posts[i].description, 'post-card__description')

            const likeContainer = createContainer('post-card__like')
            const likeIcon = document.createElement('span')
            likeIcon.className = 'post-card__like-btn'
            likeIcon.innerHTML = posts[i].isLiked ? likeFill : likeEmpty
            const postLikes = createTextContainer('p', `${posts[i].likes.length}`)
            likeIcon.addEventListener('click', () => { onLikePost(posts[i].id) })
            likeContainer.append(likeIcon, postLikes)

            postContainer.append(authorAndDate, postTitle, postDescription, likeContainer)

            let postImg;
            if (posts[i].img !== '') {
                const imgContainer = createContainer('post-card__img-container')
                postImg = document.createElement('img')
                postImg.className = 'post-card__img'
                postImg.src = posts[i].img
                imgContainer.appendChild(postImg)
                postContainer.appendChild(imgContainer)
            }
            postsContainer.appendChild(postContainer)
        }

        parentNode.appendChild(postsContainer)
    }
}

export default postList