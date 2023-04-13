import React from "react";

//TODO: Handle validation

function BaseInput({ label, name, rules, type, register, ...delegated }) {
  const id = React.useId();
  const errorId = `${id}-error`;

  const requiredAttr = rules.required && {
    "aria-required": true,
    "aria-invalid": true,
  };

  return (
    <div>
      <label className="c-base-input__label" htmlFor={id}>
        {label}
      </label>
      <span className="c-base-input__error" id={errorId}></span>
      <input
        className="c-base-input__input"
        {...delegated}
        {...register(name, { required: rules.required })}
        id={id}
        aria-describedby={errorId}
        type={type}
        {...requiredAttr}
      />
    </div>
  );
}

export default React.memo(BaseInput);
