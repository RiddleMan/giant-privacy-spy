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
            <div>
                <picture style={pictureStyle}>
                    <img src={this.bgResolver()} alt="background" />
                </picture>
                <LoginForm />
            </div>
        );
    }
}

export default LoginPage;
