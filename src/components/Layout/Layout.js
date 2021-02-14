import React, { Component, Fragment } from "react";

import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showDrawer: false,
  };

  closeDrawerHandler = () => {
    this.setState({ showDrawer: false });
  };

  toggleDrawerClickHandler = () => {
    this.setState({ showDrawer: !this.state.showDrawer });
  };

  render() {
    return (
      <Fragment>
        <Toolbar menuClick={this.toggleDrawerClickHandler} />
        <SideDrawer
          open={this.state.showDrawer}
          closed={this.closeDrawerHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;
