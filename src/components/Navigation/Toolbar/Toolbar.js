import React, { Component } from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems"

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <header className={classes.Header}>
          <Logo />
          <nav className={classes.DesktopOnly}>
            <NavigationItems />
          </nav>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
