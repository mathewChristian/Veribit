import {
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import productSelectors from 'src/modules/product/productSelectors';
import destroyActions from 'src/modules/product/destroy/productDestroyActions';
import destroySelectors from 'src/modules/product/destroy/productDestroySelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';

function ProductViewToolbar(props) {
  const [
    destroyConfirmVisible,
    setDestroyConfirmVisible,
  ] = useState(false);

  const dispatch = useDispatch();

  const id = props.match.params.id;

  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToEdit = useSelector(
    productSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    productSelectors.selectPermissionToDestroy,
  );
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const doOpenDestroyConfirmModal = () => {
    setDestroyConfirmVisible(true);
  };

  const doCloseDestroyConfirmModal = () => {
    setDestroyConfirmVisible(false);
  };

  const doDestroy = () => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  return (
    <div className="mb-4">
      {hasPermissionToEdit && (
        <Link to={`/product/${id}/edit`}>
          <button
            className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            type="button"
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faEdit}
            />
            {i18n('common.edit')}
          </button>
        </Link>
      )}

      {hasPermissionToDestroy && (
        <button
          className="mb-2 mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          type="button"
          disabled={destroyLoading}
          onClick={doOpenDestroyConfirmModal}
        >
          <FontAwesomeIcon
            className="mr-2"
            icon={faTrashAlt}
          />
          {i18n('common.destroy')}
        </button>
      )}

      {hasPermissionToAuditLogs && (
        <Link
          to={`/audit-logs?entityId=${encodeURIComponent(
            id,
          )}`}
        >
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

      {destroyConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy()}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </div>
  );
}

export default ProductViewToolbar;
