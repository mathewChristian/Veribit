import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import { useFormContext } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

function RadioFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    label,
    name,
    hint,
    options,
    externalErrorMessage,
    required,
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

      <div className="mt-1">
        {options.map((option) => (
          <div key={option.value}>
            <input
              className="cursor-pointer border-gray-300 dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="radio"
              id={`${inputId}-${option.value}`}
              name={`${name}-${option.value}`}
              value={option.value}
              checked={
                String(option.value) === String(watch(name))
              }
              onChange={(e) => {
                setValue(name, e.target.value, {
                  shouldValidate: true,
                });
                props.onChange &&
                  props.onChange(e.target.value);
              }}
              onBlur={(event) => {
                props.onBlur && props.onBlur(event);
              }}
            />
            <label
              className="ml-2 cursor-pointer"
              htmlFor={`${inputId}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}

        <div className="text-red-600 text-sm mt-2">
          {errorMessage}
        </div>
        {Boolean(hint) && (
          <div className="text-gray-500 text-sm mt-2">
            {hint}
          </div>
        )}
      </div>
    </div>
  );
}

RadioFormItem.defaultProps = {
  required: false,
};

RadioFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  externalErrorMessage: PropTypes.string,
};

export default RadioFormItem;
