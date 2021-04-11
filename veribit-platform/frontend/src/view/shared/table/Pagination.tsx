import PropTypes from 'prop-types';
import RCPagination from 'rc-pagination';
import React from 'react';
import { getLanguage, i18n } from 'src/i18n';

const Pagination = (props) => {
  const onChange = (current, pageSize) => {
    props.onChange({
      current: Number(current),
      pageSize: Number(pageSize),
    });
  };

  const locale = getLanguage().dictionary.pagination;
  const { pagination, disabled, showTotal } = props;
  const { current, pageSize, total } = pagination;
  return (
    <div className="flex items-center justify-end mt-2">
      <RCPagination
        pageSize={Number(pageSize)}
        current={current}
        onChange={onChange}
        total={total}
        locale={locale}
        showTotal={showTotal || undefined}
      />

      <select
        disabled={!total || disabled}
        style={{ height: '32px' }}
        className="ml-2 cursor-pointer text-sm w-28 inline-block px-4 py-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        value={Number(pageSize)}
        onChange={(event) =>
          onChange(1, event.target.value)
        }
      >
        <option value={10}>
          10 {i18n('pagination.items_per_page')}
        </option>
        <option value={20}>
          20 {i18n('pagination.items_per_page')}
        </option>
        <option value={30}>
          30 {i18n('pagination.items_per_page')}
        </option>
        <option value={40}>
          40 {i18n('pagination.items_per_page')}
        </option>
      </select>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  showTotal: PropTypes.func,
};

export default Pagination;
