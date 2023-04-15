import React from "react";

//TODO: Handle validation

function BaseInput({
  label,
  name,
  rules,
  type,
  register,
  error,
  ...delegated
}) {
  const id = React.useId();
  const errorId = `${id}-error`;

  const requiredAttr = rules.required.value && {
    "aria-required": true,
    "aria-invalid": true,
  };

  return (
    <div>
      <div className="c-base-input__label-and-error">
        <label className="c-base-input__label" htmlFor={id}>
          {label}
        </label>
        <span className="c-base-input__error">{error}</span>
      </div>
      <span className="c-base-input__error" id={errorId}></span>
      <input
        className="c-base-input__input"
        {...delegated}
        {...register(name, { ...rules })}
        id={id}
        aria-describedby={errorId}
        type={type}
        {...requiredAttr}
      />
    </div>
  );
}

export default React.memo(BaseInput);
