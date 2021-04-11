import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import { useSelector } from 'react-redux';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import selectControlStyles from 'src/view/shared/form/items/selectControlStyles';
import { v4 as uuid } from 'uuid';

function TagsFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    label,
    name,
    hint,
    externalErrorMessage,
    required,
    placeholder,
    isClearable,
    notFoundContent,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    watch,
  } = useFormContext();

  const isDarkMode = useSelector(
    layoutSelectors.selectDarkMode,
  );

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const originalValue = watch(name);

  const handleChange = (data) => {
    if (!data || !data.length) {
      setValue(name, null, { shouldValidate: true });
      props.onChange && props.onChange(null);
      return;
    }

    const commaSplittedValues = data
      .map((item) => item.value)
      .join(',')
      .split(',');

    setValue(name, commaSplittedValues, {
      shouldValidate: true,
    });
    props.onChange && props.onChange(commaSplittedValues);
  };

  const value = () => {
    if (!originalValue || !originalValue.length) {
      return [];
    }

    return originalValue.map((item) => ({
      value: item,
      label: item,
    }));
  };

  const controlStyles = selectControlStyles(
    isDarkMode,
    Boolean(errorMessage),
  );

  return (
    <div>
      {Boolean(label) && (
        <label
          className={`block text-sm text-gray-800 dark:text-gray-200`}
          htmlFor={inputId}
        >
          {label}{' '}
          {required ? (
            <span className="text-sm text-red-400">*</span>
          ) : null}
        </label>
      )}

      <CreatableSelect
        className="w-full mt-2"
        value={value()}
        onChange={handleChange}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        id={inputId}
        name={name}
        placeholder={placeholder || ''}
        isClearable={isClearable}
        styles={controlStyles}
        isMulti
        formatCreateLabel={(inputValue) => inputValue}
        loadingMessage={() => i18n('autocomplete.loading')}
        noOptionsMessage={() => notFoundContent || ''}
      />

      <div className="text-red-600 text-sm mt-2">
        {errorMessage}
      </div>
      {Boolean(hint) && (
        <div className="text-gray-500 text-sm mt-2">
          {hint}
        </div>
      )}
    </div>
  );
}

TagsFormItem.defaultProps = {
  required: false,
  isClearable: true,
};

TagsFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
  notFoundContent: PropTypes.string,
};

export default TagsFormItem;
