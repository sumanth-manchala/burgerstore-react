import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            value: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return(
        <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '10px',
                boxSizing: 'border-box',
                border: '1px solid #ccc'
            }}
            key={ingredient.name}> 
            {ingredient.name} ({ingredient.value}) </span>
        );
    });
    return(
        <div className={classes.Order}>
            {ingredientOutput}
            <p><strong>Price: </strong>{props.price.toFixed(2)}</p>
        </div>
    );
}

export default order;