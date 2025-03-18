const feedback = {
    mount: (parentNode, feedbackText, feedbackValue) => {
        console.info('feedback mounted')
        const feedbackContainer = document.createElement('div');
        feedbackContainer.id = 'feedback'
        feedbackContainer.className = `feedback ${feedbackValue}`
        feedbackContainer.textContent = feedbackText

        parentNode.appendChild(feedbackContainer)
    },
    dismount: () => {
        console.info('feedback dismounted')
        const feedbackContainer = document.getElementById('feedback');
        feedbackContainer.remove()
    },
    update: (parentNode, feedbackText, feedbackValue) => {
        feedback.dismount();
        feedback.mount(parentNode, feedbackText, feedbackValue);
    }
}

export default feedback