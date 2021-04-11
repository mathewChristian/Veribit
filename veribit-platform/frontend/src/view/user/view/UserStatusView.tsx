import { i18n } from 'src/i18n';
import React from 'react';

function UserStatusView(props) {
  const { value } = props;

  if (!value) {
    return null;
  }

  if (value === 'active') {
    return (
      <span className="bg-green-500 text-white dark:bg-green-800 dark:text-green-100 font-medium py-1 px-2 text-sm rounded-lg">
        {i18n('user.status.active')}
      </span>
    );
  }

  if (value === 'empty-permissions') {
    return (
      <span className="bg-red-500 text-white dark:bg-red-800 dark:text-red-100 font-medium py-1 px-2 text-sm rounded-lg">
        {i18n('user.status.empty-permissions')}
      </span>
    );
  }

  return (
    <span className="bg-yellow-500 text-white dark:bg-yellow-800 dark:text-yellow-100 font-medium py-1 px-2 text-sm rounded-lg">
      {i18n('user.status.invited')}
    </span>
  );
}

export default UserStatusView;
