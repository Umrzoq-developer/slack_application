import React, {Component} from 'react';
import firebase from "../../firebase";

import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: []
        }
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            //throw error
            error = {message: 'Fill in all fields'};
            this.setState({errors: errors.concat(error)});
            return false
        } else if (!this.isPasswordValid(this.state)) {
            // throw error
            error = {message: 'Password is invalid'};
            this.setState({errors: errors.concat(error)});
            return false
        } else {
            // form valid
            return true
        }

    };

    isFormEmpty = ({username, email, password, passwordConfirmation}) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    };

    isPasswordValid = ({password, passwordConfirmation}) => {
        if (password.length<6 || passwordConfirmation<6){
            return false;
        }else if(password !== passwordConfirmation){
            return false
        }else {
            return true
        }
    };

    displayErrors = (errors) => {
        errors.map((error, i) => {
            return (
                <p key={i}>
                    {error.message}
                </p>
            )
        })
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    handleSubmit = (event) => {
        if (this.isFormValid()) {
            event.preventDefault();
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    ;

    render() {
        const {username, email, password, passwordConfirmation, errors} = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className='app'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' icon color='orange' textAlign='center'>
                        <Icon name='puzzle piece' color='orange'/>
                        Register for Devchat
                    </Header>

                    <Form
                        size='large'
                        onSubmit={this.handleSubmit}
                    >
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name='username'
                                icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                type='text'
                                value={username}
                                onChange={this.handleChange}
                            />

                            <Form.Input
                                fluid
                                name='email'
                                icon='mail'
                                iconPosition='left'
                                placeholder='Email Address'
                                type='email'
                                value={email}
                                onChange={this.handleChange}
                            />

                            <Form.Input
                                fluid
                                name='password'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={this.handleChange}
                            />

                            <Form.Input
                                fluid
                                name='passwordConfirmation'
                                icon='repeat'
                                iconPosition='left'
                                placeholder='Password Confirmation'
                                type='password'
                                value={passwordConfirmation}
                                onChange={this.handleChange}
                            />

                            <Button
                                color='orange'
                                fluid
                                size='large'
                            >
                                Submit
                            </Button>
                        </Segment>
                    </Form>
                    {
                        errors.length>0 && (
                            <Message error>
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                        )
                    }
                    <Message>
                        Already have an account?
                        <Link to='/login'>
                            Login
                        </Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }

}

export default Register;