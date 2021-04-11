import React from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'src/i18n';

export default (selectors) => {
  function ImporterStatus() {
    const completed = useSelector(
      selectors.selectCompleted,
    );
    const importing = useSelector(
      selectors.selectImporting,
    );
    const nonPendingRowsCount = useSelector(
      selectors.selectNonPendingRowsCount,
    );
    const rowsCount = useSelector(
      selectors.selectRowsCount,
    );
    const percent = useSelector(selectors.selectPercent);
    const errorRowsCount = useSelector(
      selectors.selectErrorRowsCount,
    );

    const renderCompleted = () => {
      return (
        <div className="w-full bg-green-500 text-white dark:bg-green-800 dark:text-green-100 font-medium py-3 px-5 text-sm rounded-md">
          {i18n('importer.completed.success')}
        </div>
      );
    };

    const renderCompletedSomeErrors = () => {
      return (
        <div className="w-full bg-yellow-500 text-white dark:bg-yellow-800 dark:text-yellow-100 font-medium py-3 px-5 text-sm rounded-md">
          {i18n('importer.completed.someErrors')}
        </div>
      );
    };

    const renderCompletedAllErrors = () => {
      return (
        <div className="w-full bg-red-500 text-white dark:bg-red-800 dark:text-red-100 font-medium py-3 px-5 text-sm rounded-md">
          {i18n('importer.completed.allErrors')}
        </div>
      );
    };

    const renderProcessing = () => {
      return (
        <>
          <div className="w-full bg-gray-500 text-white dark:bg-gray-800 dark:text-gray-100 font-medium py-3 px-5 text-sm rounded-t-md">
            {i18n(
              'importer.importedMessage',
              nonPendingRowsCount,
              rowsCount,
            )}{' '}
            {i18n('importer.noNavigateAwayMessage')}
          </div>
          <div className="relative">
            <div className="overflow-hidden h-2 text-xs flex bg-blue-200 rounded-b-md">
              <div
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
        </>
      );
    };

    const renderBody = () => {
      const isAllErrors = errorRowsCount === rowsCount;

      if (completed && isAllErrors) {
        return renderCompletedAllErrors();
      }

      const isSomeErrors = Boolean(errorRowsCount);

      if (completed && isSomeErrors) {
        return renderCompletedSomeErrors();
      }

      const allSuccess = !errorRowsCount;

      if (completed && allSuccess) {
        return renderCompleted();
      }

      return renderProcessing();
    };

    if (!importing && !completed) {
      return null;
    }

    return renderBody();
  }

  return ImporterStatus;
};
