import React, { Component } from 'react';

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
                valueType: '',
                value: '',
                validation: {
                    required: true,
                    minLenght: 6
                },
                valid: false,
                touched: false
            }
        }
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
                <form>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
            </div>
        )
    }
}

export default Auth;