import RegisterForm from '../components/RegisterForm';
import { reduxForm } from 'redux-form';
import { register } from '../utils/api';
import { changeToken } from '../actions/token';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';

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

const validateRePassword = (values) => {
    const pass = values.password;
    const repass = values.repassword;

    if(pass !== repass)
        return {
            repassword: 'Password must match'
        };
};

const validate = (values) => {
    return {
        ...validateUser(values),
        ...validatePassword(values),
        ...validateRePassword(values)
    };
};

export default reduxForm({
    form: 'login',
    fields: ['user', 'password', 'email', 'repassword'],
    validate
}, undefined, {
    onSubmit: (values, dispatch) => {
        const user = values.user;
        const password = values.password;
        const email = values.email;

        return register({
            user,
            password,
            email
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
                _error: 'duuuuuupa'
            };
        });
    }
})(connect(undefined, {
})(RegisterForm));
