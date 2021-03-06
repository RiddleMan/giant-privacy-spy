import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LoginInput from './LoginInput';
import LoginFormHeader from './LoginFormHeader';
import ContentLoader from './ContentLoader';

const LoginButton = ({ submitting }) => {
    return (
        <RaisedButton
            primary
            style={{
                flex: 1,
                marginLeft: 10
            }}
            type="submit"
            disabled={submitting}
            label={
                <ContentLoader
                    isLoading={submitting}>Login</ContentLoader>
            } />
    );
};

const RegisterButton = ({ onClick }) => {
    return (
        <RaisedButton
            style={{
                flex: 1
            }}
            secondary
            onClick={onClick}
            label="Register" />
    );
};

const LoginFields = (props) => {
    const {
        handleSubmit,
        onRegister,
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
            <LoginInput
                name="username"
                label="Username"
                errorText={user.touched && user.error}
                {...user}
                />
            <LoginInput
                name="password"
                type="password"
                label="Password"
                errorText={password.touched && password.error}
                {...password}/>
            {error && <p>Wrong username or password</p>}
            <div style={{
                flex: 1,
                display: 'flex'
            }}>
                <RegisterButton
                    onClick={onRegister} />
                <LoginButton
                    submitting={submitting} />
            </div>
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
            <LoginFormHeader />
            <Divider />
            <LoginFields
                {...props}/>
        </Paper>
    );
};

export default LoginForm;
