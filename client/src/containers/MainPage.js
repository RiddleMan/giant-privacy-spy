import React, { Component } from 'react';
import { AppBar, FloatingButton } from '../components/layout';
import { Map } from '../components/map';
import { fitContainer } from '../utils/styles';

const pageSettings = {
    appBarHeight: '64px'
};

const LowerContainer = (props) => {
    const { children } = props;

    const styles = {
        position: 'relative',
        height: `calc(100% - ${pageSettings.appBarHeight})`
    };

    return (
        <div style={styles}>
            {children}
        </div>
    );
};

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [{
                position: {
                    lat: 25.0112183,
                    lng: 121.52067570000001
                },
                key: 'Taiwan',
                defaultAnimation: 2
            }]
        };
    }
    
    render() {
        const { markers } = this.state;

        return (
            <div
                style={fitContainer()}
                >
                <AppBar title="G.P.S." />
                <LowerContainer>
                    <Map markers={markers} />
                    <FloatingButton />
                </LowerContainer>
            </div>
        );
    }
}

export default MainPage;
