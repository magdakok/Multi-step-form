import React from "react";
import { ErrorMessage } from "@hookform/error-message";

//TODO: Handle validation

function BaseInput({
  label,
  name,
  rules,
  type,
  register,
  errors,
  ...delegated
}) {
  const id = React.useId();
  const errorId = `${id}-error`;

  const requiredAttr = rules.required.value && {
    "aria-required": true,
    "aria-invalid": true,
  };

  const errorMessages = errors[name] && (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages }) =>
        messages &&
        Object.entries(messages).map(([type, message]) => (
          <React.Fragment key={type}>{message}</React.Fragment>
        ))
      }
    />
  );

  return (
    <div className="c-base-input__group">
      <label className="c-base-input__label" htmlFor={id}>
        {label}
      </label>
      <input
        className={`c-base-input__input ${
          errorMessages && "c-base-input__input--error"
        }`}
        {...delegated}
        {...register(name, { ...rules })}
        id={id}
        aria-describedby={errorId}
        type={type}
        {...requiredAttr}
      />
      <p className="c-base-input__error" id={errorId} aria-live="polite">
        {errorMessages}
      </p>
    </div>
  );
}

export default BaseInput;