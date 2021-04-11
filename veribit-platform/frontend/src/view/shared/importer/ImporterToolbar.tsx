import {
  faFile,
  faFileExcel,
  faSave,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { i18n } from 'src/i18n';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  function ImporterToolbar() {
    const dispatch = useDispatch();
    const [
      resetConfirmVisible,
      setResetConfirmVisible,
    ] = useState(false);
    const [
      discardConfirmVisible,
      setDiscardConfirmVisible,
    ] = useState(false);

    const hasRows = useSelector(selectors.selectHasRows);
    const importing = useSelector(
      selectors.selectImporting,
    );
    const completed = useSelector(
      selectors.selectCompleted,
    );

    const doOpenResetConfirmModal = () => {
      setResetConfirmVisible(true);
    };

    const doCloseResetConfirmModal = () => {
      setResetConfirmVisible(false);
    };

    const doOpenDiscardConfirmModal = () => {
      setDiscardConfirmVisible(true);
    };

    const doCloseDiscardConfirmModal = () => {
      setDiscardConfirmVisible(false);
    };

    const doReset = () => {
      doCloseDiscardConfirmModal();
      doCloseResetConfirmModal();
      dispatch(actions.doReset());
    };

    const doPause = () => {
      dispatch(actions.doPause());
    };

    const doImport = () => {
      dispatch(actions.doImport());
    };

    const doDownloadTemplate = () => {
      dispatch(actions.doDownloadTemplate());
    };

    const showDownloadTemplate = !hasRows;
    const showImport = hasRows && !importing && !completed;
    const showDiscard = hasRows && !importing && !completed;
    const showNew = Boolean(completed);
    const showPause = hasRows && importing;

    return (
      <div>
        {showDownloadTemplate && (
          <>
            <button
              className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              type="button"
              onClick={doDownloadTemplate}
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faFileExcel}
              />
              {i18n('importer.form.downloadTemplate')}
            </button>

            {templateHelp && (
              <span
                data-tip={templateHelp}
                data-for="importer-toolbar-help-tooltip"
                data-html={true}
              >
                <i
                  style={{ fontSize: '18px' }}
                  className="fas fa-info-circle"
                />
                <ReactTooltip id="importer-toolbar-help-tooltip" />
              </span>
            )}
          </>
        )}

        {showImport && (
          <button
            onClick={doImport}
            className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            type="button"
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faSave}
            />
            {i18n('common.import')}
          </button>
        )}

        {showPause && (
          <button
            type="button"
            className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={doPause}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faPause}
            />
            {i18n('common.pause')}
          </button>
        )}

        {showNew && (
          <button
            className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            type="button"
            onClick={doOpenResetConfirmModal}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faFile}
            />
            {i18n('common.new')}
          </button>
        )}

        {showDiscard && (
          <button
            type="button"
            className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={doOpenDiscardConfirmModal}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faTrashAlt}
            />
            {i18n('common.discard')}
          </button>
        )}

        {discardConfirmVisible && (
          <ConfirmModal
            title={i18n('importer.list.discardConfirm')}
            onConfirm={() => doReset()}
            onClose={() => doCloseDiscardConfirmModal()}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}

        {resetConfirmVisible && (
          <ConfirmModal
            title={i18n('common.areYouSure')}
            onConfirm={() => doReset()}
            onClose={() => doCloseResetConfirmModal()}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}
      </div>
    );
  }

  return ImporterToolbar;
};
