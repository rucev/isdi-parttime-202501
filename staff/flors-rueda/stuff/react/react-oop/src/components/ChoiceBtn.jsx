const reactElement = React.createElement;

class ChoiceBtn extends React.Component {
    constructor(props) { //{btnContent, bntCallback}
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //console.info(`button ${this.props.btnContent} mounted`)
    }

    render() {
        return (<div className="btn" onClick={() => this.props.bntCallback()}>{this.props.btnContent}</div>);
    }
}