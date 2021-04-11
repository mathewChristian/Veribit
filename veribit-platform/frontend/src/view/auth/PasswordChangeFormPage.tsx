import React from 'react';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import PasswordChangeForm from 'src/view/auth/PasswordChangeForm';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function PasswordChangeFormPage(props) {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('auth.passwordChange.title')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className="text-lg font-medium mb-6">
          {i18n('auth.passwordChange.title')}
        </h1>

        <PasswordChangeForm
          onCancel={() => getHistory().push('/')}
        />
      </div>
    </>
  );
}

export default PasswordChangeFormPage;
