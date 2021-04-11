import { yupResolver } from '@hookform/resolvers/yup';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import config from 'src/config';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import I18nFlags from 'src/view/layout/I18nFlags';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import Message from 'src/view/shared/message';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
  rememberMe: yupFormSchemas.boolean(
    i18n('user.fields.rememberMe'),
  ),
});

function SigninPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);

  const { socialErrorCode } = queryString.parse(
    location.search,
  );

  const externalErrorMessage = useSelector(
    selectors.selectErrorMessage,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (socialErrorCode) {
      if (socialErrorCode === 'generic') {
        Message.error(i18n('errors.defaultErrorMessage'));
      } else {
        Message.error(
          i18n(`auth.social.errors.${socialErrorCode}`),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [initialValues] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(
      actions.doSigninWithEmailAndPassword(
        email,
        password,
        rememberMe,
      ),
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/signin.jpg'
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
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6"
            >
              <InputFormItem
                name="email"
                label={i18n('user.fields.email')}
                autoComplete="email"
                autoFocus
                externalErrorMessage={externalErrorMessage}
              />

              <div className="mt-4">
                <InputFormItem
                  name="password"
                  label={i18n('user.fields.password')}
                  autoComplete="password"
                  type="password"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="">
                  <input
                    className="cursor-pointer rounded border-gray-300 dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="checkbox"
                    id={'rememberMe'}
                    name={'rememberMe'}
                    ref={form.register}
                  />

                  <label
                    className="cursor-pointer ml-1 text-sm text-gray-600 dark:text-gray-400"
                    htmlFor={'rememberMe'}
                  >
                    {i18n('user.fields.rememberMe')}
                  </label>
                </div>

                <div className="pr-0">
                  <Link
                    className="cursor-pointer text-sm text-gray-600 dark:text-gray-400"
                    to="/auth/forgot-password"
                  >
                    {i18n('auth.forgotPassword')}
                  </Link>
                </div>
              </div>

              <div className="mt-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  {i18n('auth.signin')}
                </button>
              </div>
            </form>
          </FormProvider>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

            <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
              {i18n('auth.social.header')}
            </span>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
          </div>
          <div className="flex items-center mt-6 space-x-3">
            <a
              href={`${config.backendUrl}/auth/social/google`}
              className="flex items-center justify-center w-full px-6 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
            >
              <svg
                className="w-4 h-4 mx-2 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
              </svg>

              <span className="mx-2">
                {i18n('auth.social.signinWithGoogle')}
              </span>
            </a>

            <a
              href={`${config.backendUrl}/auth/social/facebook`}
              className="p-2 text-sm font-medium text-gray-500 transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-gray-200"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </a>
          </div>
          <div className="mt-8">
            <I18nFlags />
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 py-4 rounded-b-md">
          <Link
            className="block text-xs text-center font-medium text-gray-800 dark:text-gray-200 hover:underline"
            to="/auth/signup"
          >
            {i18n('auth.createAnAccount')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
