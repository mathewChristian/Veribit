import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n, i18nHtml } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';

function EmailUnverifiedPage() {
  const dispatch = useDispatch();

  const email = useSelector(
    selectors.selectCurrentUserEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingEmailConfirmation,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doSubmit = () => {
    dispatch(actions.doSendEmailConfirmation());
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          backgroundImageUrl ||
          '/images/emailUnverified.jpg'
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

          <div className="mt-6 text-lg text-center">
            {i18nHtml(
              'auth.emailUnverified.message',
              email,
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              disabled={loading}
              onClick={doSubmit}
            >
              {i18n('auth.emailUnverified.submit')}
            </button>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 py-4 rounded-b-md flex justify-center">
          <button
            className="block text-xs text-center font-medium text-gray-800 dark:text-gray-200 hover:underline"
            type="button"
            onClick={doSignout}
          >
            {i18n('auth.signinWithAnotherAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailUnverifiedPage;
