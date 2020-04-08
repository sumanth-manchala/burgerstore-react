import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrroHandler';
import burgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import Checkout from '../Checkout/Checkout';
import { Route, withRouter } from 'react-router-dom';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.4
};
class BurgerBuilder extends Component{

    state = {
        ingredients:null,
        error: false,
        purchasable: false,
        orderClicked: false,
        totalPrice: 4,
        loading: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.values(updatedIngredients).reduce(
            (sum,el) => sum+el
        ,0);
        let newPurchaseState = null;
        if (sum>0){
            newPurchaseState = true;
        }
        else{
            newPurchaseState = false;
        }
        this.setState({
            purchasable: newPurchaseState
        })

    }

    addIngredientHandler = (type) => {
        const newIngredientCount = this.state.ingredients[type] + 1;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newIngredientCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
                ingredients: newIngredients,
                totalPrice: newPrice
            });
        this.updatePurchaseState(newIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <=0){
            return;
        }
        const newIngredientCount = this.state.ingredients[type] - 1;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newIngredientCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
                ingredients: newIngredients,
                totalPrice: newPrice
            });
        this.updatePurchaseState(newIngredients);
    }

    orderHandler = () => {
        this.setState({
            orderClicked: true
        });
    }

    orderCancelHandler = () => {
        this.setState({
            orderClicked: false
        });
    }
    
    orderContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]) );
        }
        queryParams.push(encodeURIComponent('price')+ '=' + encodeURIComponent(this.state.totalPrice));
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString
        });
       
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;  
        let burger = <Spinner />;
        if(this.state.error){
            burger = <p style={{textAlign: "center"}}>Ingredients can't be loaded</p>
        }
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        addHandler={this.addIngredientHandler} 
                        removeHandler={this.removeIngredientHandler} 
                        disabledInfo={disabledInfo} 
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        orderHandler={this.orderHandler}/>
                </Aux>); 
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                continueHandler={this.orderContinueHandler}
                cancelHandler={this.orderCancelHandler}/>;
            
        }
        if (this.state.loading){
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);