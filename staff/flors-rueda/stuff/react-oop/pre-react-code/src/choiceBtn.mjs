const choiceBtn = {
    mount: (parentNode, btnContent, btnCallback) => {
        console.info(`btn ${btnContent} mounted`)
        const choiceBtnElement = document.createElement('div');
        choiceBtnElement.id = 'btn'
        choiceBtnElement.className = `btn`
        choiceBtnElement.textContent = btnContent

        choiceBtnElement.addEventListener('click', btnCallback)

        parentNode.appendChild(choiceBtnElement)
    },
    dismount: () => {
        console.info('btn dismounted')
        const choiceBtnElement = document.getElementById('btn');
        choiceBtnElement.remove()
    },
    update: (parentNode) => {
        choiceBtn.dismount();
        choiceBtn.mount(parentNode);
    }
}

export default choiceBtn