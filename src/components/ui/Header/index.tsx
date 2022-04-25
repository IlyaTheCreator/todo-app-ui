import React from "react";

import classes from "./Header.module.scss";

/**
 * Header UI element
 */
const Header: React.FC = () => {
  return (
    <header>
      <h1 className={classes.title}>todos</h1>
    </header>
  );
};

export default Header;
