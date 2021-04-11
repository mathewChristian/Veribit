import React from 'react';
import { i18n } from 'src/i18n';
import OrderListFilter from 'src/view/order/list/OrderListFilter';
import OrderListTable from 'src/view/order/list/OrderListTable';
import OrderListToolbar from 'src/view/order/list/OrderListToolbar';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function OrderListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.order.menu')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className=" text-lg font-medium mb-6">
          {i18n('entities.order.list.title')}
        </h1>
        <OrderListToolbar />
        <OrderListFilter />
        <OrderListTable />
      </div>
    </>
  );
}

export default OrderListPage;
