class Feedback extends React.Component {
    constructor(props) { //{feedbackValue, feedbackText}
        super(props);
    }

    componentDidMount() {
        console.info(`feedback mounted`)
    }
    render() {
        return (<div>
            <div className={`feedback ${this.props.feedbackValue}`}>
                {this.props.feedbackText}
            </div>
        </div>);
    }
}