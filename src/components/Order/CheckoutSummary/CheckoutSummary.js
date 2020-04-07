import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h2>We hope this is delicious</h2>
            <div style={{width: "100%", margin: "auto"}}>
                <Burger ingredients = {props.ingredients}/>
                <Button btnType="Danger" click={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" click={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default checkoutSummary;