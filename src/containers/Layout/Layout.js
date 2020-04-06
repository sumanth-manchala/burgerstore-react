import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
                <Toolbar toggleHandler={this.SideDrawerToggleHandler}/>
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    closeHandler={this.showSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        

        );
    }
} 

export default Layout;