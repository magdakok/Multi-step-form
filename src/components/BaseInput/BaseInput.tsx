import React, { useId } from "react";
import { ErrorMessage } from "@hookform/error-message";
import css from "./BaseInput.module.scss";
import { BaseInputProps } from "../../types";
import "what-input";

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
}: BaseInputProps) {
  const id = useId();
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
    <div className={css.group}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={errorMessages ? css.inputWithError : css.input}
        {...delegated}
        {...register && {
          ...register(name, {
            ...rules,
            onChange: (event: React.FormEvent<HTMLInputElement>) => handleMultipleInputs((event.target as HTMLTextAreaElement).value, index),
          })
        }}
        id={id}
        aria-describedby={errorId}
        value={value}
        aria-invalid={errorMessages ? "true" : "false"}
        aria-required={register ? "true" : "false"}
      />
      <p className={css.errorMessage} id={errorId} aria-live="polite">
        {errorMessages}
      </p>
    </div>
  );
}

export default BaseInput;
