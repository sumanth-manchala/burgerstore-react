import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidate &&props.updated){
        inputClasses.push(classes.Invalid);
        validationError = <p style={{color: 'red', margin: '5px 0'}}>Please enter a valid value</p>
    }
    switch(props.elementType){
        case('input'):
            inputElement = (
                <input onChange={props.changeHandler} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
            );
            break;
        case('select'):
            inputElement = (
                <select onChange={props.changeHandler} className={inputClasses.join(' ')} value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.key}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        case('textarea'):
            inputElement = (
                <textarea onChange={props.changeHandler} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
            );
            break;
        
        default:
            inputElement = (
                <input onChange={props.changeHandler} className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
            );
            break;

    }
    return (
        <div className={classes.Input}>
            <p className={classes.Label}>{props.label}</p>
            {inputElement}
            {validationError}
        </div>

    );
}

export default input;