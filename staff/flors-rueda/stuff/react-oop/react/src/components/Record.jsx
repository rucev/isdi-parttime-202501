class Record extends React.Component {
    constructor(props) {
        super(props); //{record}
    }

    componentDidMount() {
        console.info(`record mounted`)
    }

    render() {
        return (<div>
            <div className="record">
                {
                    (this.props.record && this.props.record.length > 0)
                    && this.props.record.map(recordItem => <div className="record-item">
                        <div className={`${recordItem.won === 'player' ? 'winner' : 'loser'}`}>{recordItem.player.content}</div>
                        <div className={`${recordItem.won === 'pc' ? 'winner' : 'loser'}`}>{recordItem.pc.content}</div>
                    </div>)
                }
            </div>
        </div>);
    }
}