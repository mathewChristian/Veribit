import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import { v4 as uuid } from 'uuid';

function TextAreaFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    autoComplete,
    externalErrorMessage,
    required,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
  } = useFormContext();

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

      <div className="flex flex-nowrap items-baseline">
        <textarea
          id={inputId}
          name={name}
          ref={register}
          onChange={(event) => {
            props.onChange &&
              props.onChange(event.target.value);
          }}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
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

TextAreaFormItem.defaultProps = {
  required: false,
};

TextAreaFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
};

export default TextAreaFormItem;
