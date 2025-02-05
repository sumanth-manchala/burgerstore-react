import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => {

    //console.log(props);
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    moreHandler={()=> props.addHandler(ctrl.type)}
                    lessHandler={()=> props.removeHandler(ctrl.type)}
                    disable={props.disabledInfo[ctrl.type]} /> 
            ))}
            <button 
                className={classes.OrderButton} 
                onClick={props.orderHandler} 
                disabled={!props.purchasable}> {props.isAuth ? 'ORDER NOW!' : 'SIGNUP TO ORDER' }</button>
        </div>
    );

}

export default buildControls;