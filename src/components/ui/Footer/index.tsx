import React from "react";

import classes from "./Footer.module.scss";

/**
 * Footer UI element
 */
const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <p className={classes.text}>Double-click to edit a todo</p>
      <p className={classes.text}>Created by MMTR</p>
      <p className={classes.text}>Part of Softline</p>
    </footer>
  );
};

export default Footer;
