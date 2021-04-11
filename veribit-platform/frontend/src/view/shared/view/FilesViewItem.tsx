import PropTypes from 'prop-types';
import React from 'react';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';

function FilesViewItem(props) {
  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <div className="mb-4">
      <label className="text-medium text-gray-600 dark:text-gray-400">
        {props.label}
      </label>
      <div>
        <FilesUploader readonly value={valueAsArray()} />
      </div>
    </div>
  );
}

FilesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default FilesViewItem;
