import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";

/**
 * Header UI element
 */
const Header: React.FC = () => {
  return (
    <header>
      <Link to='/' className={classes.link}>
        <h1 className={classes.title}>todos</h1>
      </Link>
    </header>
  );
};

export default Header;
