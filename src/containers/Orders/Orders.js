import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders';
import order from '../../components/Order/Order/Order';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    
    componentDidMount() {
        axios.get('/orders.json')
            .then(res =>{
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                }
                //console.log(fetchedOrders);
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }
    render(){
        const orders = this.state.orders.map(order => (
            <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price} />
        ));
        console.log(orders);
        return(
            <div>
                {orders}
            </div>
            
        );
    }
}

export default Orders;