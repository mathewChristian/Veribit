import { yupResolver } from '@hookform/resolvers/yup';
import queryString from 'query-string';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';

const schema = yup.object().shape({
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
});

function PasswordResetPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = queryString.parse(location.search).token;

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const [initialValues] = useState({
    password: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const loading = useSelector(
    selectors.selectLoadingPasswordReset,
  );

  const onSubmit = async ({ password }) => {
    dispatch(actions.doResetPassword(token, password));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/forgotPassword.jpg'
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
              className="mt-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <InputFormItem
                name="password"
                placeholder={i18n('user.fields.password')}
                autoComplete="password"
                type="password"
              />

              <div className="mt-6">
                <button
                  type="submit"
                  className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  disabled={loading}
                >
                  {i18n('auth.passwordReset.message')}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 py-4 rounded-b-md">
          <Link
            className="block text-xs text-center font-medium text-gray-800 dark:text-gray-200 hover:underline"
            to="/auth/signin"
          >
            {i18n('common.cancel')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetPage;
