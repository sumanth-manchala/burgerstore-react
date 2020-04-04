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
            salad:2,
            cheese:1,
            bacon:1,
            meat:2
        },
        totalPrice: 4
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
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;