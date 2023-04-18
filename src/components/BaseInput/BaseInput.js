import React from "react";
import { ErrorMessage } from "@hookform/error-message";

function BaseInput({
  index = 0,
  label,
  name,
  rules,
  type,
  register,
  errors,
  value,
  handleMultipleInputs,
  ...delegated
}) {
  console.log("BaseInput re-rendered");
  const id = React.useId();
  const errorId = `${id}-error`;

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
          errorMessages ? "c-base-input__input--error" : ""
        }`}
        {...delegated}
        {...register(name, {
          ...rules,
          onChange: (event) => handleMultipleInputs(event.target.value, index),
        })}
        id={id}
        aria-describedby={errorId}
        value={value}
        aria-invalid={errorMessages ? "true" : "false"}
        aria-required={register ? "true" : "false"}
      />
      <p className="c-base-input__error" id={errorId} aria-live="polite">
        {errorMessages}
      </p>
    </div>
  );
}

export default BaseInput;
