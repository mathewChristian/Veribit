import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import { getHistory } from 'src/modules/store';

function VerifyEmailPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = queryString.parse(location.search).token;

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const signedIn = useSelector(selectors.selectSignedIn);
  const errorMessage = useSelector(
    selectors.selectErrorMessageVerifyEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingVerifyEmail,
  );

  useEffect(() => {
    dispatch(actions.doVerifyEmail(token));
  }, [dispatch, token]);

  const doSignout = async () => {
    await dispatch(actions.doSignout());
    getHistory().push('/');
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

          {loading && (
            <div className="mt-6 text-lg text-center">
              {i18n('auth.verifyEmail.message')}
            </div>
          )}
          {!loading && !errorMessage && (
            <div className="mt-6 text-green-700 text-center text-lg">
              {i18n('auth.verifyEmail.success')}
            </div>
          )}
          {!loading && errorMessage && (
            <div className="mt-6 text-red-700 text-center text-lg">
              {errorMessage}
            </div>
          )}
          {!loading && errorMessage && (
            <div className="mt-6">
              <button
                className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type="button"
                onClick={doSignout}
              >
                {i18n('auth.signout')}
              </button>
            </div>
          )}
        </div>
        {!loading && !errorMessage && !signedIn && (
          <div className="bg-gray-100 dark:bg-gray-700 py-4 rounded-b-md">
            <Link
              to="/auth/signin"
              className="btn btn-block btn-primary"
            >
              {i18n('auth.signin')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
