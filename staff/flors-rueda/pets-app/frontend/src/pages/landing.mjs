import { createButton, createContainer, createHeader, createLogo, createTextContainer } from '../lib.mjs'
import navigate from '../navigate.mjs';

const landing = {
    mount: (body) => {
        console.info('landing mounted')
        const landingContainer = createContainer('landing');
        landingContainer.id = 'landing'
        const contentContainer = createContainer('landing__content')
        const landingTitle = createTextContainer('h1', 'PET APP', 'landing__title');
        const landingSubtitle = createTextContainer('h2', 'A social app for pets', 'landing__subtitle');
        const joinButton = createButton('Join in!', 'header__join-button', () => navigate('landing', 'register'))


        const header = createHeader(joinButton)
        const logo = createLogo('20rem');

        contentContainer.append(landingTitle, logo, landingSubtitle)

        landingContainer.append(header, contentContainer)

        body.appendChild(landingContainer)
    },
    dismount: () => {
        console.info('landing dismounted')
        const landing = document.getElementById('landing');
        landing.remove()
    },
    update: (body) => {
        landing.dismount();
        landing.mount(body);
    }
}

export default landing