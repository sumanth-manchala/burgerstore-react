import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders'
import Order from '../../components/Order/Order/Order';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrroHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  
    componentDidMount() {
        this.props.fetchOrders();
    }
    render(){
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            ));
        }
        console.log(orders);
        return(
            <div>
                {orders}
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios));