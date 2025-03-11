import data from '../data.mjs' //TODO DEBERIA PASAR POR LOGIC, AÑADIR VALIDADORES
import { createButton, createContainer, createForm, createHeader, createLogo, createTextContainer } from '../lib.mjs'
import { getAllPosts, publishPost } from '../logics.mjs'
import navigate from '../navigate.mjs'

const onUserMenuClick = (homeContainer) => {
    const menu = document.getElementById('user-menu')
    if (menu) {
        closeUserMenu()
    } else {
        openUserMenu(homeContainer)
    }
}

const openUserMenu = (homeContainer) => {
    const menu = document.createElement('aside')
    menu.className = 'header__user-menu'
    menu.id = 'user-menu'

    const button1 = createButton('Meh', 'header__user-menu--button', function () { closeUserMenu() })
    const button2 = createButton('Meh', 'header__user-menu--button', function () { closeUserMenu() })
    const button3 = createButton('Meh', 'header__user-menu--button', function () { closeUserMenu() })

    const logoutButton = createButton('Logout', 'header__user-menu--button', function () {
        if (sessionStorage.id) {
            sessionStorage.removeItem('id')
        }
        if (localStorage.id) {
            localStorage.removeItem('id')
        }
        closeUserMenu()
        navigate('home', 'login')

    })

    menu.append(button1, button2, button3, logoutButton)
    homeContainer.appendChild(menu)
}

const closeUserMenu = () => {
    const menu = document.getElementById('user-menu')

    menu.remove()
}


const home = {
    mount: (body) => {
        console.info('home mounted')
        const homeContainer = createContainer('home')
        homeContainer.id = 'home'

        let loggedUserId;
        if (localStorage.id) {
            loggedUserId = JSON.parse(localStorage.getItem('id'));
        } else {
            loggedUserId = JSON.parse(sessionStorage.getItem('id')); //comprobar si se ha guardado el id de un usuario loggeado
        }

        const userLogged = data.findUserById(loggedUserId)

        if (!userLogged) { //en caso de que no haya un id de usuario loggeado, en lugar de crear la vista de home, creamos la de register
            alert('inicia sesión o create una cuenta primero, listillo tocacódigos')
            return createRegisterPage();
        }

        const logo = createLogo('2rem')
        const loggedUserUsername = userLogged.username //nos traemos el nombre de usuario para dar un mensaje de bienvenida personalizado
        const welcomeText = createTextContainer('p', `Welcome, ${loggedUserUsername}`, '')

        const userButton = createButton(userLogged.username[0].toUpperCase(), 'header__user-button', () => onUserMenuClick(homeContainer))

        const header = createHeader(logo, welcomeText, userButton);

        const titleInput = { label: 'Your post title', inputType: 'text', inputPlaceholder: 'I am a title :D', inputId: 'title', isRequired: true }
        const descriptionInput = { label: 'Your description', inputType: 'text', inputPlaceholder: 'Blah blah blah blah', inputId: 'description', isRequired: true }
        const imgInput = { label: 'Your image url', inputType: 'url', inputPlaceholder: '.png, .jpg, etc', inputId: 'img', isRequired: false }

        const createPostForm = createForm([titleInput, descriptionInput, imgInput], 'Post', (postData) => {
            publishPost(postData)
            home.update(body)
        })

        const posts = getAllPosts();

        const postsContainer = createContainer('posts')

        for (let i = 0; i < posts.length; i++) {
            const postContainer = createContainer('post-card');
            const authorAndDate = createTextContainer('p', `${posts[i].author} said on ${posts[i].createdOn}`, 'post-card__author')
            const postTitle = createTextContainer('h3', posts[i].title, 'post-card__title')
            const postDescription = createTextContainer('p', posts[i].description, 'post-card__description')
            postContainer.append(authorAndDate, postTitle, postDescription)
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

        homeContainer.append(header, createPostForm, postsContainer);
        body.appendChild(homeContainer)

    },
    dismount: () => {
        console.info('home dismounted')
        const home = document.getElementById('home');
        home.remove()
    },
    update: (body) => {
        home.dismount();
        home.mount(body);
    }
}

export default home