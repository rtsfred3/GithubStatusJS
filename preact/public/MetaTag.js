import { Component } from 'preact';

class MetaTag extends Component {
    constructor() {
        super();
        this.state = { time: Date.now() };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render(props) {
        return <meta />
    }
}

export default MetaTag;