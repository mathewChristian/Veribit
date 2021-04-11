import { faSave } from '@fortawesome/free-regular-svg-icons';
import {
  faTimes,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import Storage from 'src/security/storage';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yupFormSchemas.string(
    i18n('user.fields.firstName'),
    {
      max: 80,
    },
  ),
  lastName: yupFormSchemas.string(
    i18n('user.fields.lastName'),
    {
      max: 175,
    },
  ),
  phoneNumber: yupFormSchemas.string(
    i18n('user.fields.phoneNumber'),
    {
      matches: /^[0-9]/,
      max: 24,
    },
  ),
  avatars: yupFormSchemas.images(
    i18n('user.fields.avatars'),
    {
      max: 1,
    },
  ),
});

function ProfileFormPage(props) {
  const dispatch = useDispatch();

  const saveLoading = useSelector(
    selectors.selectLoadingUpdateProfile,
  );

  const currentUser = useSelector(
    selectors.selectCurrentUser,
  );

  const [initialValues] = useState(() => {
    const record = currentUser || {};

    return {
      firstName: record.firstName,
      lastName: record.lastName,
      phoneNumber: record.phoneNumber,
      avatars: record.avatars || [],
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    dispatch(actions.doUpdateProfile(values));
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full sm:w-md md:w-md lg:w-md">
          <label className="block text-sm text-gray-800 dark:text-gray-200">
            {i18n('user.fields.email')}
          </label>
          <div className="mt-1">{currentUser.email}</div>
        </div>

        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <InputFormItem
            name="firstName"
            label={i18n('user.fields.firstName')}
            autoComplete="firstName"
            autoFocus
          />
        </div>

        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <InputFormItem
            name="lastName"
            label={i18n('user.fields.lastName')}
            autoComplete="lastName"
          />
        </div>

        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <InputFormItem
            name="phoneNumber"
            label={i18n('user.fields.phoneNumber')}
            autoComplete="phoneNumber"
            prefix="+"
          />
        </div>

        <div className="w-full sm:w-md md:w-md lg:w-md mt-4">
          <ImagesFormItem
            name="avatars"
            label={i18n('user.fields.avatars')}
            storage={Storage.values.userAvatarsProfiles}
            max={1}
          />
        </div>

        <div className="pt-4">
          <button
            className="mr-2 mb-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={saveLoading}
            type="button"
            onClick={form.handleSubmit(onSubmit)}
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faSave}
            />
            {i18n('common.save')}
          </button>

          <button
            disabled={saveLoading}
            onClick={onReset}
            className="mr-2 mb-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            type="button"
          >
            <FontAwesomeIcon
              className="mr-2"
              icon={faUndo}
            />
            {i18n('common.reset')}
          </button>

          {props.onCancel ? (
            <button
              disabled={saveLoading}
              onClick={() => props.onCancel()}
              className="mr-2 mb-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              type="button"
            >
              <FontAwesomeIcon
                className="mr-2"
                icon={faTimes}
              />
              {i18n('common.cancel')}
            </button>
          ) : null}
        </div>
      </form>
    </FormProvider>
  );
}

export default ProfileFormPage;
