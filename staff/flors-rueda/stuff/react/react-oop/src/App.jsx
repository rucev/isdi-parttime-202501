const reactElement = React.createElement;

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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { record: [], feedbackText: 'Make your choice!', feedbackValue: '', showRecord: true };
    }

    updateFeedback(newText, newValue) {
        this.state.feedbackText = newText
        this.state.feedbackValue = newValue
    }

    handleChoiceClick(choiceName) {
        const pcChoice = getPcChoice();
        const playerChoice = CHOICES.find(choice => choice.name === choiceName)
        const winner = determineWinner(playerChoice, pcChoice)
        this.state.record.push({ player: playerChoice, pc: pcChoice, won: winner })
        if (winner === 'player') this.updateFeedback('You won!', 'win')
        else if (winner === 'pc') this.updateFeedback('You lose!', 'lose')
        else this.updateFeedback(`It's a draw!`, 'draw')
        this.forceUpdate()
    }

    render() {
        const { record, feedbackText, feedbackValue, showRecord } = this.state
        return (<div>
            <button onClick={() => this.setState({ showRecord: !this.state.showRecord })}>RECORD</button>
            <div className="btn-container">
                {/*Construir un código que me devuelva varias instancias de mi clase ChoiceBtn*/
                    CHOICES.map((choice, index) => <ChoiceBtn key={index} btnContent={choice.content} bntCallback={() => this.handleChoiceClick(choice.name)} />)
                }{/*[<Component key=1/>, <Component key=2 />, <Component/>]*/}
            </div>
            <Feedback feedbackText={feedbackText} feedbackValue={feedbackValue} />
            {showRecord && <Record record={record} />}
        </div>);
    }
}