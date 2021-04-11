import React from 'react';
import { i18n } from 'src/i18n';
import CustomerListFilter from 'src/view/customer/list/CustomerListFilter';
import CustomerListTable from 'src/view/customer/list/CustomerListTable';
import CustomerListToolbar from 'src/view/customer/list/CustomerListToolbar';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function CustomerListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.customer.menu')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className=" text-lg font-medium mb-6">
          {i18n('entities.customer.list.title')}
        </h1>
        <CustomerListToolbar />
        <CustomerListFilter />
        <CustomerListTable />
      </div>
    </>
  );
}

export default CustomerListPage;
