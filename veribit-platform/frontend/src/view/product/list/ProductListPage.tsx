import React from 'react';
import { i18n } from 'src/i18n';
import ProductListFilter from 'src/view/product/list/ProductListFilter';
import ProductListTable from 'src/view/product/list/ProductListTable';
import ProductListToolbar from 'src/view/product/list/ProductListToolbar';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function ProductListPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('entities.product.menu')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className=" text-lg font-medium mb-6">
          {i18n('entities.product.list.title')}
        </h1>
        <ProductListToolbar />
        <ProductListFilter />
        <ProductListTable />
      </div>
    </>
  );
}

export default ProductListPage;
