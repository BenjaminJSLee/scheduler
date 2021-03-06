import React from "react";
import classNames from 'classnames';

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let listClass = classNames('day-list__item',{
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = function(spots) {
    return `${spots || "no"} spot${spots !== 1 ? "s" : ""} remaining`;
  };

  return (
    <li className={listClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}