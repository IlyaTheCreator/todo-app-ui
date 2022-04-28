import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.scss';

/**
 * Header UI element
 */
const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <Link to="/" className={classes.link}>
          <h1 className={classes.title}>todos</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
