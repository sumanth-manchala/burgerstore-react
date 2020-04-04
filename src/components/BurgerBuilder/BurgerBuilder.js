import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../Burger/Burger';
import BuildControls from '../Burger/BuildControls/BuildControls';


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

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    addHandler={this.addIngredientHandler} 
                    removeHandler={this.removeIngredientHandler} 
                    disabledInfo={disabledInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;