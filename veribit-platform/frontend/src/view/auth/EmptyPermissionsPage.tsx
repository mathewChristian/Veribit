import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';

function EmptyPermissionsPage() {
  const dispatch = useDispatch();

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          backgroundImageUrl ||
          '/images/emptyPermissions.jpg'
        })`,
      }}
      className="bg-cover h-screen flex items-center justify-center"
    >
      <div className="w-full md:max-w-sm lg:max-w-sm m-auto bg-white md:rounded-md lg:rounded-md shadow-md dark:bg-gray-800">
        <div className="p-6">
          <div className="w-full flex justify-center items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                className="w-72 max-h-14 object-cover"
                alt={i18n('app.title')}
              />
            ) : (
              <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
                {i18n('app.title')}
              </h1>
            )}
          </div>

          <div className="mt-6 text-lg">
            {i18n('auth.emptyPermissions.message')}
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 py-4 rounded-b-md flex justify-center">
          <button
            className="block text-xs text-center font-medium text-gray-800 dark:text-gray-200 hover:underline"
            type="button"
            onClick={doSignout}
          >
            {i18n('auth.signout')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmptyPermissionsPage;
