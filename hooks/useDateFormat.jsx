import React from 'react';

const useDateFormat = time => {
  const date = new Date(time);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[new Date(time).getMonth()];
  const day = date.getDate();
  return `${day} ${month}`;
};

export default useDateFormat;
