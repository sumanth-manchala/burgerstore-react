import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrroHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{

    state = {
        orderClicked: false,
    }

    componentDidMount() {
        this.props.initIngredients();
        
    }

    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.values(updatedIngredients).reduce(
            (sum,el) => sum+el
        ,0);
        return sum > 0;

    }


    orderHandler = () => {
        if(this.props.isAuth){
            this.setState({orderClicked: true});
        }
        else{
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    orderCancelHandler = () => {
        this.setState({
            orderClicked: false
        });
    }
    
    orderContinueHandler = () => {
        this.props.purchaseBurgerInit();
        this.props.history.push('/checkout');
       
    }

    render(){
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;  
        let burger = <Spinner />;
        if(this.props.error){
            burger = <p style={{textAlign: "center"}}>Ingredients can't be loaded</p>
        }
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addHandler={this.props.addIngredient} 
                        removeHandler={this.props.removeIngredient} 
                        disabledInfo={disabledInfo} 
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        isAuth={this.props.isAuth} 
                        orderHandler={this.orderHandler}/>
                </Aux>); 
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                continueHandler={this.orderContinueHandler}
                cancelHandler={this.orderCancelHandler}/>;
            
        }
        return(
            <Aux>
                <Modal show={this.state.orderClicked} modalClose={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token != null
    };
}

const mapDispatchToProps = dispatch => {
    return{
        addIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        purchaseBurgerInit: () => dispatch(actions.purchaseBurgerInit),
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
}
export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));