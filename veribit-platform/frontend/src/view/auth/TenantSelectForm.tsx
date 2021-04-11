import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import actions from 'src/modules/tenant/invitation/tenantInvitationActions';
import selectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  id: yupFormSchemas.string(i18n('tenant.fields.tenantId')),
});

function TenantSelectForm(props) {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const invitedTenants = useSelector(
    authSelectors.selectInvitedTenants,
  );

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const [initialValues] = useState({
    id: invitedTenants[0].id,
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const onSubmit = ({ id }) => {
    const tenantUserInvitation = currentUser.tenants.find(
      (tenantUser) => tenantUser.tenant.id === id,
    );

    dispatch(
      actions.doAccept(
        tenantUserInvitation.invitationToken,
      ),
    );
  };

  return (
    <FormProvider {...form}>
      <form
        className="mt-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SelectFormItem
          name="id"
          label={i18n('tenant.fields.tenantId')}
          options={invitedTenants.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          isClearable={false}
        />

        <div className="mt-6">
          <button
            type="submit"
            className="disabled:opacity-50 disabled:cursor-default w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            disabled={loading}
          >
            {i18n('tenant.invitation.accept')}
          </button>
        </div>

        <div className="mt-2">
          <button
            type="button"
            className="w-full disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            onClick={props.onViewToggle}
          >
            {i18n('tenant.new.title')}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default TenantSelectForm;
