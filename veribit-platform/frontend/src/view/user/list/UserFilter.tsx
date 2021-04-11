import {
  faSearch,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
import userEnumerators from 'src/modules/user/userEnumerators';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import * as yup from 'yup';

const schema = yup.object().shape({
  fullName: yupFilterSchemas.string(
    i18n('user.fields.fullName'),
  ),
  email: yupFilterSchemas.email(i18n('user.fields.email')),
  role: yupFilterSchemas.enumerator(
    i18n('user.fields.role'),
  ),
  status: yupFilterSchemas.enumerator(
    i18n('user.fields.status'),
  ),
});

const emptyValues = {
  fullName: null,
  email: null,
  role: null,
  status: null,
};

const previewRenders = {
  fullName: {
    label: i18n('user.fields.fullName'),
    render: filterRenders.generic(),
  },
  email: {
    label: i18n('user.fields.email'),
    render: filterRenders.generic(),
  },
  role: {
    label: i18n('user.fields.role'),
    render: (value) =>
      value ? i18n(`roles.${value}.label`) : null,
  },
  status: {
    label: i18n('user.fields.status'),
    render: filterRenders.enumerator('user.status'),
  },
};

function UserFilter(props) {
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(
      actions.doFetch(
        schema.cast(initialValues),
        rawFilter,
      ),
    );
    // eslint-disable-next-line
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const onRemove = (key) => {
    form.setValue(key, emptyValues[key]);
    return form.handleSubmit(onSubmit)();
  };

  const { loading } = props;

  return (
    <div className="border-gray-200 dark:border-gray-600 border rounded-md mb-2">
      <FilterPreview
        onClick={() => {
          setExpanded(!expanded);
        }}
        renders={previewRenders}
        values={rawFilter}
        expanded={expanded}
        onRemove={onRemove}
      />
      <div className={`${expanded ? 'block' : 'hidden'}`}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="pl-4 pr-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <InputFormItem
                name={'email'}
                label={i18n('user.fields.email')}
              />

              <InputFormItem
                name={'fullName'}
                label={i18n('user.fields.fullName')}
              />

              <SelectFormItem
                name={'status'}
                label={i18n('user.fields.status')}
                options={userEnumerators.status.map(
                  (value) => ({
                    value,
                    label: i18n(`user.status.${value}`),
                  }),
                )}
              />

              <SelectFormItem
                name={'role'}
                label={i18n('user.fields.role')}
                options={userEnumerators.roles.map(
                  (value) => ({
                    value,
                    label: i18n(`roles.${value}.label`),
                  }),
                )}
              />
            </div>

            <div className="px-4 py-2 text-right">
              <button
                className="mr-2 mb-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type="submit"
                disabled={loading}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faSearch}
                />
                {i18n('common.search')}
              </button>
              <button
                className="mr-2 mb-2 text-sm disabled:opacity-50 disabled:cursor-default px-4 py-2 tracking-wide dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-600 dark:text-white text-gray-700 border border-gray-300 transition-colors duration-200 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                type="button"
                onClick={onReset}
                disabled={loading}
              >
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faUndo}
                />
                {i18n('common.reset')}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default UserFilter;
