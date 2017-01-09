import React from 'react';
import logo from '../images/touch/chrome-touch-icon-192x192.png';

const Logo = () => {
    const logoStyle = {
        width: '90px',
        margin: '14px 20px',
        marginRight: '0px'
    };

    const imgStyle = {
        maxWidth: '100%'
    };

    return (<picture style={logoStyle}>
        <img
            style={imgStyle}
            src={logo}
            alt="logo" />
    </picture>);
};

export default () => {
    return (
        <header
            style={{
                display: 'flex',
                width: '60%',
                marginLeft: '50px'
            }}>
            <Logo />
            <hgroup
                style={{
                    alignSelf: 'center',
                    marginTop: '-8px'
                }}>
                <h1
                    style={{marginBottom: '0px'}}>
                    Track</h1>
                <h2
                    style={{marginTop: '0px'}}>
                yourself</h2>
            </hgroup>
        </header>
    );
};
