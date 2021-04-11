import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import { getHistory } from 'src/modules/store';
import invitationActions from 'src/modules/tenant/invitation/tenantInvitationActions';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import Spinner from 'src/view/shared/Spinner';

function InviationPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const loading = useSelector(
    invitationSelectors.selectLoading,
  );

  const warningMessage = useSelector(
    invitationSelectors.selectWarningMessage,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const token = queryString.parse(location.search).token;

  useEffect(() => {
    dispatch(invitationActions.doAcceptFromAuth(token));
  }, [dispatch, token]);

  const doAcceptWithWrongEmail = () => {
    dispatch(
      invitationActions.doAcceptFromAuth(token, true),
    );
  };

  const doSignout = async () => {
    await dispatch(authActions.doSignout());
    getHistory().push('/');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/invitation.jpg'
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

          <div className="mt-8">
            {loading && <Spinner />}

            {Boolean(warningMessage) && (
              <div className="text-center text-lg">
                {warningMessage}
              </div>
            )}
          </div>

          {Boolean(warningMessage) && (
            <div className="mt-6">
              <button
                type="submit"
                className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={doAcceptWithWrongEmail}
              >
                {i18n('tenant.invitation.acceptWrongEmail')}
              </button>
            </div>
          )}
        </div>
        {!loading && (
          <div className="bg-gray-100 dark:bg-gray-700 py-4 rounded-b-md flex justify-center">
            <button
              className="block text-xs text-center font-medium text-gray-800 dark:text-gray-200 hover:underline"
              type="button"
              onClick={doSignout}
            >
              {i18n('auth.signout')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InviationPage;
