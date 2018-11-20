import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxi/Auxi';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSidedrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSidedrawer: false });
    }

    sideDrawerToggledHandler = () => {
        this.setState((prevState) => {
            return { showSidedrawer: !prevState.showSidedrawer }
        });
    }

    render(props) {
        return (
            <Aux>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggledHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer
                    open={this.state.showSidedrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);