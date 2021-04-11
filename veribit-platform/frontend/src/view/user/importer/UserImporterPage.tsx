import React from 'react';
import { i18n } from 'src/i18n';
import actions from 'src/modules/user/importer/userImporterActions';
import fields from 'src/modules/user/importer/userImporterFields';
import selectors from 'src/modules/user/importer/userImporterSelectors';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import importerHoc from 'src/view/shared/importer/Importer';

const Importer = importerHoc(
  selectors,
  actions,
  fields,
  i18n('user.importer.hint'),
);

function UserImportPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('user.menu'), '/user'],
          [i18n('user.importer.title')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 dark:text-white border-gray-200 border rounded-md">
        <h1 className="text-lg font-medium mb-6">
          {i18n('user.importer.title')}
        </h1>
        <Importer />
      </div>
    </>
  );
}

export default UserImportPage;
