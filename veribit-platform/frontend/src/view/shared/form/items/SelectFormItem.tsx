import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import { useSelector } from 'react-redux';
import layoutSelectors from 'src/modules/layout/layoutSelectors';
import selectControlStyles from 'src/view/shared/form/items/selectControlStyles';
import { v4 as uuid } from 'uuid';

function SelectFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    label,
    name,
    hint,
    options,
    required,
    mode,
    placeholder,
    isClearable,
    externalErrorMessage,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    watch,
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const originalValue = watch(name);

  const isDarkMode = useSelector(
    layoutSelectors.selectDarkMode,
  );

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const value = () => {
    const { mode } = props;
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    if (originalValue) {
      return originalValue.map((value) =>
        options.find((option) => option.value === value),
      );
    }

    return [];
  };

  const valueOne = () => {
    const { options } = props;

    if (originalValue != null) {
      return options.find(
        (option) => option.value === originalValue,
      );
    }

    return null;
  };

  const handleSelect = (data) => {
    const { mode } = props;
    if (mode === 'multiple') {
      return handleSelectMultiple(data);
    } else {
      return handleSelectOne(data);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setValue(name, [], { shouldValidate: true });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values
      .map((data) => (data ? data.value : data))
      .filter((value) => value != null);

    setValue(name, newValue, { shouldValidate: true });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (data) => {
    if (!data) {
      setValue(name, null, { shouldValidate: true });
      props.onChange && props.onChange(null);
      return;
    }

    setValue(name, data.value, { shouldValidate: true });
    props.onChange && props.onChange(data.value);
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

      <Select
        className="w-full mt-2"
        value={value()}
        onChange={handleSelect}
        onBlur={(event) => {
          props.onBlur && props.onBlur(event);
        }}
        id={inputId}
        name={name}
        options={options}
        isMulti={mode === 'multiple'}
        placeholder={placeholder || ''}
        isClearable={isClearable}
        styles={controlStyles}
        loadingMessage={() => i18n('autocomplete.loading')}
        noOptionsMessage={() =>
          i18n('autocomplete.noOptions')
        }
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

SelectFormItem.defaultProps = {
  required: false,
  isClearable: true,
};

SelectFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  externalErrorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SelectFormItem;
