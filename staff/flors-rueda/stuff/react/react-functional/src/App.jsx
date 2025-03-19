const reactElement = React.createElement;
const useState = React.useState

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

/* versión muy simplificada de qué hace el useState por dentro
function useState (defaultValue){
    var state = defaultValue;

    function setState(value){
        state = value
    }

    return [state, setState]
}
*/


const App = () => {
    //this.state = { record: [], feedbackText: 'Make your choice!', feedbackValue: '', showRecord: true };
    const [stamp, setStamp] = useState(Date.now())
    const [feedbackText, setFeedbackText] = useState('Make your choice!')
    const [feedbackValue, setFeedbackValue] = useState('')
    const [showRecord, setShowRecord] = useState(true)

    //los metodos de clase pasan a definirse como una función
    const updateFeedback = (newText, newValue) => {
        setFeedbackText(newText)
        setFeedbackValue(newValue)
    }

    const handleChoiceClick = (choiceName) => {
        const pcChoice = getPcChoice();
        const playerChoice = CHOICES.find(choice => choice.name === choiceName)
        const winner = determineWinner(playerChoice, pcChoice)
        const record = JSON.parse(localStorage.record)
        record.push({ player: playerChoice, pc: pcChoice, won: winner })
        localStorage.record = JSON.stringify(record)
        setStamp(Date.now())
        if (winner === 'player') updateFeedback('You won!', 'win')
        else if (winner === 'pc') updateFeedback('You lose!', 'lose')
        else updateFeedback(`It's a draw!`, 'draw')
    }

    //ya no se usa el metodo render, solo con el return ya renderizamos el contenido
    return (<div>
        <button onClick={() => setShowRecord(!showRecord)}>RECORD</button>
        <div className="btn-container">
            {/*Construir un código que me devuelva varias instancias de mi clase ChoiceBtn*/
                CHOICES.map((choice, index) => <ChoiceBtn key={index} btnContent={choice.content} bntCallback={() => handleChoiceClick(choice.name)} />)
            }{/*[<Component key=1/>, <Component key=2 />, <Component/>]*/}
        </div>
        <Feedback feedbackText={feedbackText} feedbackValue={feedbackValue} />
        {showRecord && <Record stamp={stamp} />}
    </div>);
}
