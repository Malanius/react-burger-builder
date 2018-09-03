import React, { Component } from 'react';

import Aux from '../../hoc/Auxi';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSidedrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSidedrawer: false });
    }

    render(props) {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer
                    open={this.state.showSidedrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;