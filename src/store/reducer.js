import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        bacon: 0,
        salad: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1.4
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            console.log("ADD Ingredient called ",action.ingredientName);
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] 
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

            };
        default:
            return state;

    }
}

export default reducer;