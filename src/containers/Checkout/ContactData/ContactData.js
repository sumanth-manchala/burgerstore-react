import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }


    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Sumanth",
                address: {
                    street: "Test Street",
                    zip: 876432,
                    country: "India"
                },
                email: "sumanth@gmail.com"
            },
            paymentMode: "COD"
        };
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            console.log(response);
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error);
        });
        

    }
    render() {
        let form = (
            <form>
                <input type='text' className={classes.Input} name='name' placeholder='Your Name' />
                <input type='email'className={classes.Input} name='email' placeholder='Your Email' />
                <input type='text' className={classes.Input} name='street' placeholder='Street' />
                <input type='text' className={classes.Input} name='postal' placeholder='Postal Code' />
                <Button btnType="Success" click={this.orderHandler}>ORDER</Button>
                
            </form>  
        );
        if (this.state.loading){
            form = <Spinner />;
        }
        return (
            <div class={classes.ContactData}>
                <h4>Enter your Contact Data </h4>
                {form}
            </div>
        );
    }

}

export default withRouter(ContactData);