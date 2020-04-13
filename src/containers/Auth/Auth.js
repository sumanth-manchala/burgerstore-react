import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {

                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                updated: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                updated: false
            },
        },
        isSignup: true,
    }

    componentDidMount() {
        console.log(this.props);
        if(!this.props.buildingBurger && this.props.authRedirectPath!='/'){
            this.props.resetauthRedirectPath();
        }
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                updated: true
            }
        };
        this.setState({controls: updatedControls});
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    signupSwitchHandler = () => {
        this.setState({
            isSignup : !this.state.isSignup
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                updated={formElement.config.updated}
                changeHandler={( event ) => this.inputChangeHandler( event, formElement.id )} />
        ) );
        if (this.props.loading){
            form = <Spinner />
        }
        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                <Button 
                        btnType="Danger" 
                        click={this.signupSwitchHandler}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token != null,
        authRedirectPath: state.auth.authRedirectPath,
        buildingBurger: state.burgerBuilder.building
    }
}
const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        resetauthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);

