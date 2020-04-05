import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.4
};
class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad:0,
            cheese:0,
            bacon:0,
            meat:0
        },
        purchasable: false,
        orderClicked: false,
        totalPrice: 4
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
        alert('Order Placed');
    }
    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.orderClicked} modalClose={this.orderCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        continueHandler={this.orderContinueHandler}
                        cancelHandler={this.orderCancelHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addHandler={this.addIngredientHandler} 
                    removeHandler={this.removeIngredientHandler} 
                    disabledInfo={disabledInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    orderHandler={this.orderHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;