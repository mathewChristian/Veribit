import PropTypes from 'prop-types';
import React from 'react';

function CustomViewItem(props) {
  const isBlank =
    (!props.value &&
      props.value !== 0 &&
      props.value !== false) ||
    (Array.isArray(props.value) && !props.value.length);

  if (isBlank) {
    return null;
  }

  return (
    <div className="mb-4">
      <label className="text-medium text-gray-600 dark:text-gray-400">
        {props.label}
      </label>
      <div>{props.render(props.value)}</div>
    </div>
  );
}

CustomViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  render: PropTypes.func,
};

export default CustomViewItem;
