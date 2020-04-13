import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: orderData,
        orderId: id
    };
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}


export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token, orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams)
            .then(res =>{
                const fetchedOrders = [];
                for(let key in res.data){
                    fetchedOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    }
}