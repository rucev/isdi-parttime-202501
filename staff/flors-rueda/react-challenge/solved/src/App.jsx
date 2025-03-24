const useState = React.useState //Nos traemos el hook useState de react
const useEffect = React.useEffect //Nos traemos el hook useEffect de react

const App = () => {
    const [words, setWords] = useState([])
    const [numbers, setNumbers] = useState([])
    const [timeStamp, setTimeStamp] = useState(Date.now())
    const [view, setView] = useState('words')
    const [showForm, setShowForm] = useState(true)

    useEffect(() => {
        if (view === 'words') {
            const retrievedWords = data.words.getAll()
            setWords(retrievedWords)
        } else {
            const retrievedNumbers = data.numbers.getAll()
            setNumbers(retrievedNumbers)
        }

    }, [timeStamp])

    const handleChangeViewClick = (viewToNavigate) => {
        if (view !== viewToNavigate) {
            setView(viewToNavigate)
            setShowForm(false)
        } else {
            setShowForm(!showForm)
        }

        if (showForm === true) setTimeStamp(Date.now())
    }

    const handleSendNewWord = (newWordFormData) => {
        const newWord = newWordFormData.word
        data.words.addNew(newWord)
        setShowForm(false)
        setTimeStamp(Date.now())
    }

    const handleDeleteWord = (wordIndex) => {
        data.words.deleteByIndex(wordIndex)
        setTimeStamp(Date.now())
    }

    const handleSendNewNumber = (newNumberFormData) => {
        const newNumber = newNumberFormData.number
        data.numbers.addNew(newNumber)
        setShowForm(false)
        setTimeStamp(Date.now())
    }

    const handleDeleteNumber = (numberIndex) => {
        data.numbers.deleteByIndex(numberIndex)
        setTimeStamp(Date.now())
    }

    return (<div className="main-container">
        <div className="navigation-container">
            <Btn
                className={'navigation-button'}
                btnCallback={() => handleChangeViewClick('words')}
                btnContent={(view === 'words' && !showForm) ? 'Añadir más palabras' : 'Ir a lista de palabras'}
            />
            <Btn
                className={'navigation-button'}
                btnCallback={() => handleChangeViewClick('numbers')}
                btnContent={(view === 'numbers' && !showForm) ? 'Añadir más números' : 'Ir a lista de números'}
            />
        </div>
        {(view === 'words' && showForm) &&
            < Form
                inputs={[{ type: 'text', placeholder: 'Nueva palabra', id: 'word', className: 'input' }]}
                onsSubmitCallback={(formData) => handleSendNewWord(formData)}
                className={'form'}
                submitText={'Añadir palabra'}
            />
        }
        {(view === 'words' && !showForm) &&
            <List items={words} onItemClick={handleDeleteWord} />
        }
        {(view === 'numbers' && showForm) &&
            < Form
                inputs={[{ type: 'number', placeholder: 'Nuevo número', id: 'number', className: 'input' }]}
                onsSubmitCallback={(formData) => handleSendNewNumber(formData)}
                className={'form'}
                submitText={'Añadir número'}
            />
        }
        {(view === 'numbers' && !showForm) &&
            <List items={numbers} onItemClick={handleDeleteNumber} />
        }
    </div>);
}
