import React from 'react';

export const SortingDropDown = ({ sortValue, setSortValue }) => (
  <div class='call-history__dropdown' onChange={event => setSortValue(event.target.value)}>
    <select defaultValue='time'>
      <option value='time'>Sort By Time</option>
      <option value='name'>Sort By Name</option>
    </select>
  </div>
);
