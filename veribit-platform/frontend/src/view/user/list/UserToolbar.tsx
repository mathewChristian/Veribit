import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import {
  faHistory,
  faUpload,
  faUserMinus,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { i18n } from 'src/i18n';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
import userSelectors from 'src/modules/user/userSelectors';

function UserToolbar(props) {
  const dispatch = useDispatch();

  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToCreate = useSelector(
    userSelectors.selectPermissionToCreate,
  );
  const hasPermissionToImport = useSelector(
    userSelectors.selectPermissionToImport,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const loading = useSelector(selectors.selectLoading);
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );

  const doExport = () => {
    dispatch(actions.doExport());
  };

  const doDestroyAllSelected = () => {
    dispatch(actions.doDestroyAllSelected());
  };

  const renderExportButton = () => {
    const disabled = !hasRows || loading;

    const button = (
      <button
        className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
        type="button"
        disabled={disabled || exportLoading}
        onClick={doExport}
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={faFileExcel}
        />
        {i18n('common.export')}
      </button>
    );

    if (disabled) {
      return (
        <span
          data-tip={i18n('common.noDataToExport')}
          data-tip-disable={!disabled}
          data-for="user-users-toolbar-export-tooltip"
        >
          {button}
          <ReactTooltip id="user-users-toolbar-export-tooltip" />
        </span>
      );
    }

    return button;
  };

  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <button
        disabled={disabled}
        className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        type="button"
        onClick={doDestroyAllSelected}
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={faUserMinus}
        />
        {i18n('common.destroy')}
      </button>
    );

    if (disabled) {
      return (
        <span
          data-tip={i18n('common.mustSelectARow')}
          data-tip-disable={!disabled}
          data-for="user-users-toolbar-destroy-all-tooltip"
        >
          {button}
          <ReactTooltip id="user-users-toolbar-destroy-all-tooltip" />
        </span>
      );
    }

    return button;
  };

  return (
    <div className="mb-4">
      {hasPermissionToCreate && (
        <Link to="/user/new">
          <button
            className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            type="button"
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faUserPlus}
            />
            {i18n('common.new')}
          </button>
        </Link>
      )}

      {hasPermissionToImport && (
        <Link to="/user/importer">
          <button
            className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            type="button"
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faUpload}
            />
            {i18n('common.import')}
          </button>
        </Link>
      )}

      {renderDestroyButton()}

      {hasPermissionToAuditLogs && (
        <Link to="/audit-logs?entityNames=user">
          <button
            className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            type="button"
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faHistory}
            />
            {i18n('auditLog.menu')}
          </button>
        </Link>
      )}

      {renderExportButton()}
    </div>
  );
}

export default UserToolbar;
