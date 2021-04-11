import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import actions from 'src/modules/tenant/form/tenantFormActions';
import selectors from 'src/modules/tenant/form/tenantFormSelectors';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import * as yup from 'yup';
import config from 'src/config';
import { urlfy } from '../shared/urlfy';
import { tenantSubdomain } from 'src/modules/tenant/tenantSubdomain';
import { yupResolver } from '@hookform/resolvers/yup';

const schemaWithUrl = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('tenant.fields.tenantName'),
    {
      required: true,
      max: 50,
    },
  ),
  url: yupFormSchemas
    .string(i18n('tenant.fields.tenantUrl'), {
      required: true,
      max: 50,
    })
    .matches(
      /^[a-z0-9][-a-zA-Z0-9]*$/,
      i18n('tenant.validation.url'),
    ),
});

const schemaWithoutUrl = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('tenant.fields.tenantName'),
    {
      required: true,
      max: 50,
    },
  ),
});

const schema = tenantSubdomain.isEnabled
  ? schemaWithUrl
  : schemaWithoutUrl;

function TenantNewForm(props) {
  const dispatch = useDispatch();

  const [initialValues] = useState({
    name: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const loading = useSelector(selectors.selectSaveLoading);

  const invitedTenants = useSelector(
    authSelectors.selectInvitedTenants,
  );

  const onSubmit = ({ name }) => {
    dispatch(actions.doCreate({ name }));
  };

  return (
    <FormProvider {...form}>
      <form
        className="mt-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <InputFormItem
          name="name"
          label={i18n('tenant.fields.tenantName')}
          autoComplete="name"
          onChange={(value) => {
            // @ts-ignore
            form.setValue('url', urlfy(value));
          }}
          autoFocus
        />

        {tenantSubdomain.isEnabled && (
          <div className="mt-4">
            <InputFormItem
              name="url"
              label={i18n('tenant.fields.tenantUrl')}
              endAdornment={`.${config.frontendUrl.host}`}
            />
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={loading}
          >
            {i18n('tenant.create.button')}
          </button>
        </div>

        {Boolean(invitedTenants.length) && (
          <div className="mt-2">
            <button
              type="button"
              className="w-full disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              onClick={props.onViewToggle}
            >
              {i18n('tenant.invitation.view')}
            </button>
          </div>
        )}
      </form>
    </FormProvider>
  );
}

export default TenantNewForm;
