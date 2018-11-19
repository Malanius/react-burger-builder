import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email addres'
                },
                valueType: '',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                valueType: 'password',
                value: '',
                validation: {
                    required: true,
                    minLenght: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    swichAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    checkValidity(value, rules) {
        if (!rules) {
            return true;
        }

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLenght) {
            isValid = value.length >= rules.minLenght && isValid;
        }

        if (rules.maxLenght) {
            isValid = value.length <= rules.maxLenght && isValid;
        }

        return isValid;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    render() {
        const formElementsArrays = [];
        for (let key in this.state.controls) {
            formElementsArrays.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElementsArrays.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valueType={formElement.config.valueType}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">{this.state.isSignUp ? 'Sing up!' : 'Login'}</Button>
                </form>
                <Button btnType="Danger"
                    clicked={this.swichAuthModeHandler}>
                    Swith to {this.state.isSignUp ? 'SignIn' : 'SignUp'}
                </Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(null, mapDispatchToProps)(Auth);