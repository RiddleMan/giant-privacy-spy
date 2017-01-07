import LoginForm from '../components/LoginForm';
import { reduxForm } from 'redux-form';
import { login } from '../utils/api';
import { changeToken } from '../actions/token';
import { routeActions } from 'react-router-redux';

/* helper */
const validator = (name) => (func) => (values) => {
    const errors = {};

    const res = func(values[name]);
    if(res)
        errors[name] = res;

    return errors;
};

const validateUser = validator('user')(
    (value) => {
        if(!value)
            return 'Required';
    });

const validatePassword = validator('password')(
    (value) => {
        if(!value)
            return 'Required';
        if(value.length < 5)
            return 'Too short';
    });

const validate = (values) => {
    return {
        ...validateUser(values),
        ...validatePassword(values)
    };
};

export default reduxForm({
    form: 'login',
    fields: ['user', 'password'],
    validate
}, undefined, {
    onSubmit: (values, dispatch) => {
        const user = values.user;
        const password = values.password;

        return login({
            user,
            password
        })
        .then((response) => {
            return response.json();
        })
        .then((res) => {
            dispatch(changeToken(res.token));
            dispatch(routeActions.push('/'));

            return {};
        }, () => {
            return {
                _error: 'Wrong username or password'
            };
        });
    }
})(LoginForm);
