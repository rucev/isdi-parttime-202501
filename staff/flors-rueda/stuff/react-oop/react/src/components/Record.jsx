class Record extends React.Component {
    constructor(props) {
        super(props); //{record}
    }

    componentDidMount() {
        console.info(`record mounted ${this.props.record.length}`)
    }

    componentDidUpdate() {
        console.info(`record updated ${this.props.record.length}`)
    }

    componentWillUnmount() {
        console.info(`record dismounted ${this.props.record.length}`)
    }

    render() {
        return (<div>
            <div className="record">
                {
                    (this.props.record && this.props.record.length > 0)
                    && this.props.record.map((recordItem, index) => <div key={index} className="record-item">
                        <div className={`${recordItem.won === 'player' ? 'winner' : 'loser'}`}>{recordItem.player.content}</div>
                        <div className={`${recordItem.won === 'pc' ? 'winner' : 'loser'}`}>{recordItem.pc.content}</div>
                    </div>)
                }
            </div>
        </div>);
    }
}