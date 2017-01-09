import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import LoginInput from './LoginInput';
import LoginFormHeader from './LoginFormHeader';
import ContentLoader from './ContentLoader';

const RegisterButton = ({ submitting }) => {
    return (
        <RaisedButton
            disabled={submitting}
            type="submit"
            style={{
                flex: 1
            }}
            primary
            label={
                <ContentLoader
                    isLoading={submitting}>Register</ContentLoader>
            } />
    );
};

const LoginFields = (props) => {
    const {
        handleSubmit,
        fields: {
            user,
            password,
            repassword,
            // location,
            email
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
                {...user} />
            <LoginInput
                name="email"
                label="Email"
                errorText={user.touched && email.error}
                {...email} />
            <LoginInput
                name="password"
                type="password"
                label="Password"
                errorText={password.touched && password.error}
                {...password}/>
            <LoginInput
                name="repassword"
                type="password"
                label="Confirm password"
                errorText={repassword.touched && repassword.error}
                {...repassword}/>
            {error && <p>dupa</p>}
            <RegisterButton
                submitting={submitting} />
        </form>
    );
};

const RegisterForm = (props) => {
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

export default RegisterForm;
