import React, { Component, Fragment } from "react";

import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {

    state = {
        showDrawer: true
    };

    closeDrawerHandler = () => {
        this.setState({ showDrawer: false });
    }

    render() {
    return (
      <Fragment>
        <Toolbar />
        <SideDrawer open={this.state.showDrawer} closed={this.closeDrawerHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
