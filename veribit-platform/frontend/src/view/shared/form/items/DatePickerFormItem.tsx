import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import DatePicker from 'react-datepicker';
import { v4 as uuid } from 'uuid';

export function DatePickerFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    externalErrorMessage,
    required,
    showTimeInput,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    watch,
  } = useFormContext();

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <div className="form-group">
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

      <div>
        <DatePicker
          id={inputId}
          name={name}
          className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring ${
            errorMessage
              ? 'border-red-400 text-red-600'
              : ''
          }`}
          onChange={(value) => {
            setValue(name, value, { shouldValidate: true });
            props.onChange && props.onChange(value);
          }}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
          selected={watch(name)}
          showTimeInput={showTimeInput}
          popperModifiers={{
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
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

DatePickerFormItem.defaultProps = {
  required: false,
};

DatePickerFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  showTimeInput: PropTypes.bool,
};

export default DatePickerFormItem;
