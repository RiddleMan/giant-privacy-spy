import React, { Component } from 'react';
import {
    Card,
    CardMedia,
    CardTitle
} from 'material-ui/Card';
import { getUserInfo } from '../utils/api';
import { connect } from 'react-redux';

class UserInfoCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: ''
        };
    }

    componentDidMount() {
        const { token } = this.props;

        getUserInfo(token)
            .then((info) => {
                this.setState(info);
            });
    }

    render() {
        const {
            name, email
        } = this.state;

        return (
            <Card>
                <CardMedia
                    overlay={<CardTitle title={name} subtitle={email} />}>
                    <img src="http://lorempixel.com/600/337/nature/" />
                </CardMedia>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { token } = state;
    return {
        token
    };
};

export default connect(mapStateToProps, {})(UserInfoCard);
