import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/settings/settingsActions';
import selectors from 'src/modules/settings/settingsSelectors';
import { getHistory } from 'src/modules/store';
import SettingsForm from 'src/view/settings/SettingsForm';
import SettingsFormToolbar from 'src/view/settings/SettingsFormToolbar';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import Spinner from '../shared/Spinner';

const SettingsFormPage = (props) => {
  const dispatch = useDispatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const settings = useSelector(selectors.selectSettings);

  useEffect(() => {
    dispatch(actions.doInit());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('settings.title')],
        ]}
      />

      <div className="mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md">
        <h1 className="text-lg font-medium mb-6">
          {i18n('settings.title')}
        </h1>

        <SettingsFormToolbar />

        {initLoading && <Spinner />}

        {!initLoading && settings && (
          <SettingsForm
            settings={settings}
            onCancel={() => getHistory().push('/')}
          />
        )}
      </div>
    </>
  );
};

export default SettingsFormPage;
