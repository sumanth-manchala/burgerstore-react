import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../Burger/Burger';

class BurgerBuilder extends Component{

    state = {
        ingredients:{
            salad:2,
            cheese:1,
            bacon:1,
            meat:2
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;