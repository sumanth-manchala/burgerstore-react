import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component{

    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false

        });
    }

    SideDrawerToggleHandler = () => {
    
        this.setState( (prevState) => ({
            showSideDrawer: !prevState.showSideDrawer
        }));
    }
    render(){
        return(
            <Aux>
                <Toolbar isAuth={this.props.isAuth} toggleHandler={this.SideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuth}
                    show={this.state.showSideDrawer} 
                    closeHandler={this.showSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        

        );
    }
} 
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
    }
}

export default connect(mapStateToProps)(Layout);