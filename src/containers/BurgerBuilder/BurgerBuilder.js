import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrroHandler';
import { ADD_INGREDIENT } from '../../store/actions';
import { connect } from 'react-redux';


class BurgerBuilder extends Component{

    state = {
        error: false,
        orderClicked: false,
        loading: false
    }

    componentDidUpdate() {
        console.log(this.props);
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }

    updatePurchaseState = (updatedIngredients) => {
        const sum = Object.values(updatedIngredients).reduce(
            (sum,el) => sum+el
        ,0);
        return sum > 0;

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
        this.props.history.push('/checkout');
       
    }

    render(){
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;  
        let burger = <Spinner />;
        if(this.state.error){
            burger = <p style={{textAlign: "center"}}>Ingredients can't be loaded</p>
        }
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addHandler={this.props.addIngredient} 
                        removeHandler={this.props.removeIngredient} 
                        disabledInfo={disabledInfo} 
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)} 
                        orderHandler={this.orderHandler}/>
                </Aux>); 
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                continueHandler={this.orderContinueHandler}
                cancelHandler={this.orderCancelHandler}/>;
            
        }
        if (this.state.loading){
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.orderClicked} modalClose={this.orderCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return{
        addIngredient: (ingName) => dispatch({type:ADD_INGREDIENT,ingredientName:ingName}),
        removeIngredient: (ingName) => dispatch({type:ADD_INGREDIENT,ingredientName:ingName})
    };
}
export default connect(mapStatetoProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));