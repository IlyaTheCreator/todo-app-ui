import React from 'react';
import cn from 'classnames';

import { filterNameType } from '../../types';

import classes from './Filters.module.scss';

// Type which describes a single filter button's data
type filterButton = {
  name: filterNameType;
  text: string;
};

// List of fitler buttons' data to iterate over later
const filterButtonsData: filterButton[] = [
  {
    name: 'all',
    text: 'All',
  },
  {
    name: 'active',
    text: 'Active',
  },
  {
    name: 'completed',
    text: 'Completed',
  },
];

interface FiltersProps {
  activeFilterName: filterNameType;
  handleFilterChange: (filterName: filterNameType) => void;
  clearCompletedTodos: () => void;
  itemsLeftAmount: number;
}

/**
 * Todos filters
 */
const Filters: React.FC<FiltersProps> = ({
  activeFilterName,
  handleFilterChange,
  clearCompletedTodos,
  itemsLeftAmount,
}) => {
  const filterButtons = filterButtonsData.map((btn: filterButton) => {
    return (
      <button
        key={btn.name}
        onClick={() => handleFilterChange(btn.name)}
        className={cn(classes['filter-btn'], {
          [classes['active-filter-btn']]: activeFilterName === btn.name,
        })}
      >
        {btn.text}
      </button>
    );
  });

  return (
    <div className={classes.filters}>
      <p>
        {itemsLeftAmount} item{itemsLeftAmount !== 1 && 's'} left
      </p>
      <div>{filterButtons}</div>
      <button
        onClick={clearCompletedTodos}
        className={`${classes['filter-btn']} ${classes['clear-completed-btn']}`}
      >
        Clear completed
      </button>
    </div>
  );
};

export default Filters;
