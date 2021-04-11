import React from 'react';
import { i18n } from 'src/i18n';
import TenantListFilter from 'src/view/tenant/list/TenantListFilter';
import TenantListTable from 'src/view/tenant/list/TenantListTable';
import TenantListToolbar from 'src/view/tenant/list/TenantListToolbar';

function TenantListPage(props) {
  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className=" text-lg font-medium mb-6">
          {i18n('tenant.list.title')}
        </h1>

        <TenantListToolbar />
        <TenantListFilter />
        <TenantListTable />
      </div>
    </>
  );
}

export default TenantListPage;
