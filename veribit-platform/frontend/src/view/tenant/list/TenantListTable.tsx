import {
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import config from 'src/config';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import destroyActions from 'src/modules/tenant/destroy/tenantDestroyActions';
import destroySelectors from 'src/modules/tenant/destroy/tenantDestroySelectors';
import invitationActions from 'src/modules/tenant/invitation/tenantInvitationActions';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import actions from 'src/modules/tenant/list/tenantListActions';
import selectors from 'src/modules/tenant/list/tenantListSelectors';
import tenantSelectors from 'src/modules/tenant/tenantSelectors';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import Plans from 'src/security/plans';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';

function TenantListTable() {
  const dispatch = useDispatch();

  const [
    recordIdToDestroy,
    setRecordIdToDestroy,
  ] = useState(null);

  const [
    invitationTokenToDeclineInvitation,
    setInvitationTokenToDeclineInvitation,
  ] = useState(null);

  const listLoading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const invitationLoading = useSelector(
    invitationSelectors.selectLoading,
  );

  const loading =
    listLoading || destroyLoading || invitationLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const hasPermissionToEdit = useSelector(
    tenantSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    tenantSelectors.selectPermissionToDestroy,
  );
  const invitationToken = useSelector(
    tenantSelectors.selectInvitationToken,
  );

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'ascend'
        ? 'descend'
        : 'ascend';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doSelectTenant = (tenant) => {
    dispatch(authActions.doSelectTenant(tenant));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(destroyActions.doDestroy(id));
  };

  const doDeclineInvitation = (token) => {
    setInvitationTokenToDeclineInvitation(null);
    dispatch(invitationActions.doDecline(token));
  };

  const doAcceptInvitation = (token) => {
    dispatch(invitationActions.doAccept(token));
  };

  return (
    <>
      <div className="table-responsive shadow rounded-lg dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200 dark:border">
        <table className="border-collapse min-w-full leading-normal">
          <thead>
            <tr>
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'name'}
                label={i18n('tenant.fields.name')}
              />
              {tenantSubdomain.isEnabled && (
                <TableColumnHeader
                  label={i18n('tenant.fields.url')}
                />
              )}
              {config.isPlanEnabled && (
                <TableColumnHeader
                  label={i18n('tenant.fields.plan')}
                />
              )}
              <TableColumnHeader className="th-actions" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={100}>
                  <Spinner />
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={100}>
                  <div className="flex justify-center p-5">
                    {i18n('table.noData')}
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row) => (
                <tr key={row.id}>
                  <td className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm">
                    {row.name}
                    {Boolean(invitationToken(row)) && (
                      <span
                        style={{ marginLeft: '8px' }}
                        className={`badge badge-warning`}
                      >
                        {i18n('tenant.invitation.invited')}
                      </span>
                    )}
                  </td>
                  {tenantSubdomain.isEnabled && (
                    <td className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm">{`${row.url}.${config.frontendUrl.host}`}</td>
                  )}
                  {config.isPlanEnabled && (
                    <td className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm">
                      <span
                        className={`font-medium py-1 px-2 text-sm rounded-lg ${
                          row.plan === Plans.values.free
                            ? 'bg-gray-500 text-white dark:bg-gray-800 dark:text-gray-100'
                            : 'bg-yellow-500 text-white dark:bg-yellow-800 dark:text-yellow-100'
                        }`}
                      >
                        {i18n(`plan.${row.plan}.label`)}
                      </span>
                    </td>
                  )}
                  <td
                    className="w-56 whitespace-nowrap border-b px-5 py-5 border-gray-200 dark:border-gray-800"
                    align="right"
                  >
                    {Boolean(invitationToken(row)) ? (
                      <>
                        <button
                          className="mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                          style={{ marginRight: '8px' }}
                          onClick={() =>
                            doAcceptInvitation(
                              invitationToken(row),
                            )
                          }
                        >
                          {i18n('tenant.invitation.accept')}
                        </button>
                        <button
                          className="text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                          onClick={() =>
                            setInvitationTokenToDeclineInvitation(
                              invitationToken(row),
                            )
                          }
                        >
                          {i18n(
                            'tenant.invitation.decline',
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        {currentTenant.id !== row.id && (
                          <button
                            className="mr-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                            onClick={() =>
                              doSelectTenant(row)
                            }
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faCheck}
                            />
                            {i18n('tenant.select')}
                          </button>
                        )}
                        {hasPermissionToEdit(row) && (
                          <Link
                            className="inline-flex justify-center items-center w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                            to={`/tenant/${row.id}/edit`}
                            title={i18n('common.edit')}
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                            />
                          </Link>
                        )}
                        {hasPermissionToDestroy(row) && (
                          <button
                            className="inline-flex justify-center items-center w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                            type="button"
                            onClick={() =>
                              setRecordIdToDestroy(row.id)
                            }
                            title={i18n('common.destroy')}
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                            />
                          </button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
      />

      {invitationTokenToDeclineInvitation && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() =>
            doDeclineInvitation(
              invitationTokenToDeclineInvitation,
            )
          }
          onClose={() =>
            setInvitationTokenToDeclineInvitation(null)
          }
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default TenantListTable;
