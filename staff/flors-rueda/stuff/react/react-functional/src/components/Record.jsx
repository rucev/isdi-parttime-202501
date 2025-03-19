const useEffect = React.useEffect

const Record = ({ stamp }) => {
    const [record, setRecord] = useState(JSON.parse(localStorage.record).reverse())

    /*componentDidMount()*/
    useEffect(() => { //callback de qué código quiero ejecutar
        console.info(`record mounted ${record.length}`)
        alert('RECORD AÑADIDO AL HTML')
    }, [] /*array de condiciones de cuando quiero ejecutarlo (si esta vacio se entiende que es cuando se monta el componente)*/)

    /*componentDidUpdate()*/
    useEffect(() => {
        console.info(`record updated ${record.length}`)
        setRecord(JSON.parse(localStorage.record).reverse())
    }, [stamp])

    /*
    componentWillUnmount() {
        console.info(`record dismounted ${this.props.record.length}`)
    }
    */

    return (<div>
        <p className="feedback">{stamp}</p>
        <div className="record">
            {
                (record && record.length > 0)
                && record.map((recordItem, index) => <div key={index} className="record-item">
                    <div className={`${recordItem.won === 'player' ? 'winner' : 'loser'}`}>{recordItem.player.content}</div>
                    <div className={`${recordItem.won === 'pc' ? 'winner' : 'loser'}`}>{recordItem.pc.content}</div>
                </div>)
            }
        </div>
    </div>);
}