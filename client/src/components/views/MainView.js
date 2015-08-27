import React from 'react';
import { AppBar } from 'material-ui';


class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            timer: 0
        };
    }
    tick() {
        this.setState({
            timer: this.state.timer + 10
        });
    }
    componentDidMount() {
        this.timer = setInterval(this.tick.bind(this), 200);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        return (
            <div>
                <h1>{this.state.timer}</h1>
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more" />
            </div>
        );
    }
}

export default MainView;
