import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(
        (igKey) => {
            return (
                <li key={igKey}> 
                    <p><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</p>
                </li>
            );
        });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Price: {props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" click={props.cancelHandler}>CANCEL</Button>
            <Button btnType="Success" click={props.continueHandler}>CONTINUE?</Button>
           
        </Aux>
    );
}

export default orderSummary;