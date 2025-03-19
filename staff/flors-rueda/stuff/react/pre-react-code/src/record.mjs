const record = {
    mount: (parentNode, recordData) => { //[{pc: {}, player: {}, won: 'player'}]
        console.info('record mounted')
        const recordContainer = document.createElement('div')
        recordContainer.id = 'record'
        recordContainer.className = `record`

        if (recordData.length > 0) {
            recordData.reverse()
            recordData.forEach(recordElement => {
                const recordItem = document.createElement('div')
                recordItem.className = 'record-item'
                const playerElement = document.createElement('div')
                playerElement.textContent = recordElement.player.content
                playerElement.className = `${recordElement.won === 'player' ? 'winner' : 'loser'}`
                const pcElement = document.createElement('div')
                pcElement.textContent = recordElement.pc.content
                pcElement.className = `${recordElement.won === 'pc' ? 'winner' : 'loser'}`

                recordItem.append(playerElement, pcElement)
                recordContainer.appendChild(recordItem)
            });
        }

        parentNode.appendChild(recordContainer)
    },
    dismount: () => {
        console.info('record dismounted')
        const recordContainer = document.getElementById('record');
        recordContainer.remove()
    },
    update: (parentNode, recordData) => {
        record.dismount();
        record.mount(parentNode, recordData);
    }
}

export default record