import React, { Component } from 'react';
import LoginForm from './LoginFormConnected';

class LoginPage extends Component {
    bgResolver() {
        const COUNT = 1;
        const which = parseInt((Math.random() * COUNT)) + 1;

        return require(`../images/login-bg/bg${which}.jpg`);
    }

    render() {
        const pictureStyle = {
            WebkitFilter: 'blur(7px) brightness(0.8)',
            filter: 'blur(7px) brightness(0.8)'
        };

        return (
            <div style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden'
            }}>
                <picture style={pictureStyle}>
                    <img
                        style={{
                            width: '110%',
                            height: '110%',
                            marginTop: '-5%',
                            marginLeft: '-5%'
                        }}
                        src={this.bgResolver()} alt="background" />
                </picture>
                <LoginForm />
            </div>
        );
    }
}

export default LoginPage;
