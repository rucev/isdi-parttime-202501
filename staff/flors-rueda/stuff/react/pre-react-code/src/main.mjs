import choiceBtn from "./choiceBtn.mjs";
import feedback from "./feedback.mjs";
import record from "./record.mjs";

const CHOICES = [
    {
        name: 'paper',
        beats: ['rock'],
        content: '🧻',
    },
    {
        name: 'rock',
        beats: ['scissors'],
        content: '🪨',
    },
    {
        name: 'scissors',
        beats: ['paper'],
        content: '✂️',
    }
];

const getPcChoice = () => CHOICES[Math.floor(Math.random() * CHOICES.length)];

const determineWinner = (playerChoice, pcChoice) => {
    if (playerChoice.beats.includes(pcChoice.name)) {
        return 'player'
    } else if (pcChoice.beats.includes(playerChoice.name)) {
        return 'pc'
    } else {
        return 'none'
    }
};

const updateDataDisplayed = (_record, winner, parentNode) => {
    if (winner === 'player') feedback.update(parentNode, 'You won!', 'win')
    else if (winner === 'pc') feedback.update(parentNode, 'You lose!', 'lose')
    else feedback.update(parentNode, `It's a draw!`, 'draw')
    record.update(parentNode, _record)
}

const handleUserChoice = (choiceName, _record, parentNode) => {
    const pcChoice = getPcChoice();
    const playerChoice = CHOICES.find(choice => choice.name === choiceName)
    const winner = determineWinner(playerChoice, pcChoice)
    _record.push({ player: playerChoice, pc: pcChoice, won: winner })
    updateDataDisplayed(_record, winner, parentNode)
}

const app = () => {
    const currentRecord = []

    const body = document.body

    const btnConainer = document.createElement('div')
    btnConainer.className = 'btn-container'


    CHOICES.forEach(choice => {
        choiceBtn.mount(btnConainer, choice.content, () => handleUserChoice(choice.name, currentRecord, body))
    })

    body.appendChild(btnConainer)


    feedback.mount(body, 'Make your choice!')
    record.mount(body, record)
}

app()