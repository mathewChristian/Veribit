import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import { useFormContext } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

export function CheckboxFormItem(props) {
  const [inputId] = useState(uuid());

  const {
    label,
    name,
    hint,
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
        <input
          type="checkbox"
          className="cursor-pointer rounded border-gray-300 dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          id={inputId}
          name={name}
          checked={watch(name) || false}
          onChange={(e) => {
            setValue(name, Boolean(e.target.checked), {
              shouldValidate: true,
            });
            props.onChange &&
              props.onChange(e.target.checked);
          }}
          onBlur={(event) =>
            props.onBlur && props.onBlur(event)
          }
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

CheckboxFormItem.defaultProps = {};

CheckboxFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  externalErrorMessage: PropTypes.string,
};

export default CheckboxFormItem;
