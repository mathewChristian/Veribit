import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import { v4 as uuid } from 'uuid';

function InputNumberRangeFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    autoComplete,
    required,
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

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const handleStartChanged = (value) => {
    setValue(name, [value, endValue()], {
      shouldValidate: true,
    });
    props.onChange && props.onChange([value, endValue()]);
  };

  const handleEndChanged = (value) => {
    setValue(name, [startValue(), value], {
      shouldValidate: true,
    });
    props.onChange && props.onChange([value, startValue()]);
  };

  const startValue = () => {
    if (!originalValue) {
      return '';
    }

    if (Array.isArray(!originalValue)) {
      return '';
    }

    if (!originalValue.length) {
      return '';
    }

    return originalValue[0];
  };

  const endValue = () => {
    if (!originalValue) {
      return '';
    }

    if (Array.isArray(!originalValue)) {
      return '';
    }

    if (originalValue.length < 2) {
      return '';
    }

    return originalValue[1];
  };

  return (
    <div>
      {Boolean(label) && (
        <label
          className={`block text-sm text-gray-800 dark:text-gray-200`}
          htmlFor={`${inputId}Start`}
        >
          {label}{' '}
          {required ? (
            <span className="text-sm text-red-400">*</span>
          ) : null}
        </label>
      )}
      <div className="flex flex-nowrap items-baseline">
        <input
          type="number"
          id={`${inputId}Start`}
          name={`${name}Start`}
          onChange={(event) =>
            handleStartChanged(event.target.value)
          }
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          value={startValue()}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring ${
            errorMessage
              ? 'border-red-400 text-red-600'
              : ''
          }`}
        />

        <div
          className="text-gray-300"
          style={{
            flexShrink: 1,
            marginLeft: '8px',
            marginRight: '8px',
          }}
        >
          ~
        </div>

        <input
          style={{ width: '100%' }}
          type="number"
          id={`${inputId}End`}
          name={`${name}End`}
          onChange={(event) =>
            handleEndChanged(event.target.value)
          }
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          value={endValue()}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring ${
            errorMessage
              ? 'border-red-400 text-red-600'
              : ''
          }`}
        />
      </div>
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

InputNumberRangeFormItem.defaultProps = {
  required: false,
};

InputNumberRangeFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
};

export default InputNumberRangeFormItem;
