import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
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

const FormHeader = () => {
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

const Field = (props) => {
    const fieldStyle = {
        width: '100%'
    };

    const { label } = props;

    return (
        <TextField
            style={fieldStyle}
            floatingLabelText={label}
            {...props}/>
    );
};

const LoginFields = (props) => {
    const {
        handleSubmit,
        fields: {
            user,
            password
        },
        error,
        submitting
    } = props;

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                paddingTop: '0px'
            }}>
            <Field
                name="username"
                label="Username"
                errorText={user.touched && user.error}
                {...user}
                />
            <Field
                name="password"
                type="password"
                label="Password"
                errorText={password.touched && password.error}
                {...password}/>
            {error && <p>Wrong username or password</p>}
            <RaisedButton
                onTouchTap={handleSubmit}
                primary
                disabled={submitting}
                label={
                    <div
                        style={{
                            marginTop: '-36px'
                        }}>
                        { submitting && <CircularProgress
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: '-6px'
                            }}
                            size={0.3}/> }
                        Login
                    </div>
                } />
        </form>
    );
};

const LoginForm = (props) => {
    const formStyle = {
        position: 'absolute',
        zIndex: 10000,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '350px'
    };

    return (
        <Paper
            style={formStyle}
            zDepth={3}>
            <FormHeader />
            <Divider />
            <LoginFields
                {...props}/>
        </Paper>
    );
};

export default LoginForm;
