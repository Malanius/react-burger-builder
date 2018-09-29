import React, { Component } from 'react'
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); //Don't allow the form to reload the page
        this.setState({ loading: true });
        //.json for firebase only
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            //dummy data
            customer: {
                name: 'Mal',
                address: {
                    street: 'Universal 96',
                    zipcode: '654321',
                    country: 'Universe'
                },
                email: 'dont.even@try.it'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name" />
                <Input inputtype="input" type="text" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="street" placeholder="Your adress" />
                <Input inputtype="input" type="text" name="postal" placeholder="Your postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}
