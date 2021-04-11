import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import DatePicker from 'react-datepicker';
import { v4 as uuid } from 'uuid';

function DatePickerRangeFormItem(props) {
  const [inputId] = useState(uuid());
  
  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    required,
    showTimeInput,
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
    props.onChange && props.onChange([startValue(), value]);
  };

  const startValue = () => {
    if (!originalValue) {
      return null;
    }

    if (Array.isArray(!originalValue)) {
      return null;
    }

    if (!originalValue.length) {
      return null;
    }

    return originalValue[0] || null;
  };

  const endValue = () => {
    if (!originalValue) {
      return null;
    }

    if (Array.isArray(!originalValue)) {
      return null;
    }

    if (originalValue.length < 2) {
      return null;
    }

    return originalValue[1] || null;
  };

  return (
    <div className="w-full">
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
        <DatePicker
          id={`${inputId}Start`}
          name={`${name}Start`}
          onChange={(value) => handleStartChanged(value)}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          selected={startValue()}
          className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring ${
            errorMessage
              ? 'border-red-400 text-red-600'
              : ''
          }`}
          showTimeInput={showTimeInput}
          popperModifiers={{
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: 'viewport',
            },
          }}
          placeholderText={placeholder || ''}
          autoFocus={autoFocus || undefined}
          autoComplete={'off'}
          dateFormat={
            showTimeInput
              ? 'yyyy-MM-dd HH:mm'
              : 'yyyy-MM-dd'
          }
          timeIntervals={15}
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

        <DatePicker
          id={`${inputId}End`}
          name={`${name}End`}
          onChange={(value) => handleEndChanged(value)}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          selected={endValue()}
          className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring ${
            errorMessage
              ? 'border-red-400 text-red-600'
              : ''
          }`}
          showTimeInput={showTimeInput}
          placeholderText={placeholder || ''}
          autoFocus={autoFocus || undefined}
          autoComplete={'off'}
          dateFormat={
            showTimeInput
              ? 'yyyy-MM-dd HH:mm'
              : 'yyyy-MM-dd'
          }
          timeIntervals={15}
          popperModifiers={{
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: 'viewport',
            },
          }}
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

DatePickerRangeFormItem.defaultProps = {
  required: false,
};

DatePickerRangeFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  showTimeInput: PropTypes.bool,
};

export default DatePickerRangeFormItem;
