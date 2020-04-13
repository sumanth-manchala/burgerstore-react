import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrroHandler';
import {checkValidity} from '../../../shared/utility';

class ContactData extends Component {

    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validity: {
                    required: true,
                },
                valid: false,
                updated: false, //To know whether user has touched this input field
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validity: {
                    required: true,
                },
                valid: false,
                updated: false,
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validity: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                updated: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validity: {
                    required: true,
                },
                valid: false,
                updated: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validity: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                updated: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validity: {},
                valid: true
            },
        },
        formIsValid: false
    }

 
    inputChangeHandler = (event, inputEleid) => {

        const formCopy = {...this.state.orderForm };
        const inputEleCopy = {...formCopy[inputEleid]};

        inputEleCopy.value = event.target.value;
        inputEleCopy.valid = checkValidity(inputEleCopy.value, inputEleCopy.validity);
        inputEleCopy.updated = true;
        formCopy[inputEleid] = inputEleCopy;
        let formIsValid = true;
        for(let inputEleIdentifier in formCopy){
            formIsValid = formCopy[inputEleIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: formCopy,
            formIsValid: formIsValid
        });

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderdata: formData,
            userId: this.props.userId
        };
        this.props.purchaseBurger(order, this.props.token);

    }
    render() {
        const formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        const formElementsOutput = formElements.map(ele => (
                <Input 
                    key={ele.id}
                    elementType={ele.config.elementType} 
                    elementConfig={ele.config.elementConfig}
                    value={ele.config.value}
                    invalid={!ele.config.valid}
                    shouldValidate={ele.config.validity} //Apply invalid property if only validation rules are set
                    updated={ele.config.updated} //untill user updates invalid class is not added
                    changeHandler={(event) => this.inputChangeHandler(event, ele.id)}/>
        ));
        //console.log(formElementsOutput);
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsOutput}
                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>  
        );
        if (this.props.loading){
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDisptachToProps = dispatch => {
    return {
        purchaseBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDisptachToProps)(withErrorHandler((withRouter(ContactData)), axios));