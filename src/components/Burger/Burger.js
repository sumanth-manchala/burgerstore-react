import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.module.css';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map(
              (_,i) => {
                  return <BurgerIngredient type={igKey} key={igKey+i}/>;
              }  
            );
        }
    ).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);   // [[],[],[]] => []
    //console.log(transformedIngredients);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Start adding ingredients!</p>;
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
        
    );
}

export default burger;