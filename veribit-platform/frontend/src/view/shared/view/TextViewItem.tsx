import PropTypes from 'prop-types';
import React from 'react';

function TextViewItem(props) {
  if (
    !props.value &&
    props.value !== 0 &&
    props.value !== false
  ) {
    return null;
  }

  const value = `${props.prefix ? `${props.prefix} ` : ''}${
    props.value
  }`;

  return (
    <div className="mb-4">
      <label className="text-medium text-gray-600 dark:text-gray-400">
        {props.label}
      </label>
      <div>{value}</div>
    </div>
  );
}

TextViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  prefix: PropTypes.string,
};

export default TextViewItem;
