import React from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'src/i18n';
import statuses from 'src/modules/shared/importer/importerStatuses';

function ImporterRowStatus(props) {
  const { value, errorMessage } = props;

  if (value === statuses.PENDING) {
    return (
      <span className="bg-gray-500 text-white dark:bg-gray-800 dark:text-gray-100 font-medium py-1 px-2 text-sm rounded-lg">
        {i18n('importer.pending')}
      </span>
    );
  }

  if (value === statuses.IMPORTED) {
    return (
      <span className="bg-green-500 text-white dark:bg-green-800 dark:text-green-100 font-medium py-1 px-2 text-sm rounded-lg">
        {i18n('importer.imported')}
      </span>
    );
  }

  if (value === statuses.ERROR) {
    return (
      <>
        <span className="bg-red-500 text-white dark:bg-red-800 dark:text-red-100 font-medium py-1 px-2 text-sm rounded-lg">
          {i18n('importer.error')}
        </span>{' '}
        <div
          style={{ wordWrap: 'break-word' }}
          className="mt-2 whitespace-pre-wrap text-red-400"
        >
          {errorMessage}
        </div>
      </>
    );
  }

  return null;
}

ImporterRowStatus.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default ImporterRowStatus;
