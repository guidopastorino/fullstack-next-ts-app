import React from 'react';

const formatDate = (timestamp) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', options);
};

const TimestampToDate = ({ timestamp }) => {
  const formattedDate = formatDate(timestamp);
  return <span>{formattedDate}</span>;
};

export default TimestampToDate;