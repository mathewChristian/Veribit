import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auditLog/auditLogActions';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import Spinner from 'src/view/shared/Spinner';
import Pagination from 'src/view/shared/table/Pagination';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function AuditLogTable(props) {
  const dispatch = useDispatch();

  const doOpenSelectdValues = (values) => {
    const data = JSON.stringify(values, null, 2);
    const jsonWindow = window.open(
      '',
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400',
    );
    (jsonWindow as any).document.write(
      `<pre>${data}</pre>`,
    );
  };

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

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

  return (
    <>
      <div className="table-responsive shadow rounded-lg dark:bg-gray-600 dark:border-gray-600 dark:text-gray-200 dark:border">
        <table className="border-collapse min-w-full leading-normal">
          <thead className="thead">
            <tr>
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'timestamp'}
                label={i18n('auditLog.fields.timestamp')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'createdByEmail'}
                label={i18n(
                  'auditLog.fields.createdByEmail',
                )}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'entityName'}
                label={i18n('auditLog.fields.entityName')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'action'}
                label={i18n('auditLog.fields.action')}
              />
              <TableColumnHeader
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'entityId'}
                label={i18n('auditLog.fields.entityId')}
              />
              <TableColumnHeader className="th-actions-sm" />
            </tr>
          </thead>
          <tbody className="dark:bg-gray-600">
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
                    {moment(row.timestamp).format(
                      'YYYY-MM-DD HH:mm',
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm">
                    {row.createdByEmail}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm">
                    {row.entityName}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm">
                    {row.action}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm">
                    {row.entityId}
                  </td>
                  <td
                    align="right"
                    className="whitespace-nowrap px-5 py-5 border-b border-gray-200 dark:border-gray-800 text-sm"
                  >
                    <button
                      type="button"
                      className="w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                      onClick={() =>
                        doOpenSelectdValues(row.values)
                      }
                      title={i18n('common.view')}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
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
    </>
  );
}

export default AuditLogTable;
