import React from "react";
import { Input } from "antd";

export interface InputField {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
  rules?: any[];
  search?: boolean;
  prefix?: React.ReactNode;
  maxLength?: number;
  onBlur?: () => void;
  disabled?: boolean;
  status?: "error" | "success" | "warning" | "info" | "default";
  visibilityToggle?: boolean;
}

export interface InputFieldsProps {
  fields: InputField[];
  className?: string;
  onChange?: (name: string, value: string) => void;
  values?: Record<string, string>;
  errors?: Record<string, string>;
  disabled?: boolean;
}

const InputFields: React.FC<InputFieldsProps> = ({
  fields,
  className,
  onChange,
  values = {},
  errors = {},
  disabled = false,
}) => {

    return (
      <div className={`form-fields-section ${className || ""}`}>
        <div className="form-fields-section__form">
          {fields.map((field) => {
            const hasError =
            Boolean(errors[field.name]) || field.status === "error";
            const isPasswordField = field.type === 'password';
            const isFieldLocked = Boolean(field.disabled);
            const isGloballyDisabled = disabled;
            const inputClassName = !field.search ? "form-fields-section__input" : "form-fields-section__input2";
            const combinedClassName = [
              inputClassName,
              hasError ? 'form-fields-section__input--error' : '',
              isFieldLocked ? 'form-fields-section__input--readonly' : '',
            ].filter(Boolean).join(' ');

            const commonInputProps = {
              placeholder: field.placeholder,
              status: hasError ? "error" as const : undefined,
              className: combinedClassName,
              prefix: field.prefix,
              value: values[field.name] || '',
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(field.name, e.target.value),
              disabled: isGloballyDisabled,
              readOnly: isFieldLocked && !isGloballyDisabled,
              'data-testid': `input-${field.name}`,
            };

            return (
              <div
                key={field.name}
                className={`form-fields-section__field ${isFieldLocked ? ' form-fields-section__field--locked' : ''}`}
              >
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label">
                      <label className={field.required ? "ant-form-item-required" : ""}>
                        {field.label}
                        {field.required && <span className="form-fields-section__required">*</span>}
                      </label>
                    </div>
                    <div className="ant-form-item-control">
                      {isPasswordField ? (
                        <Input.Password
                          {...commonInputProps}
                          visibilityToggle={field.visibilityToggle !== false}
                        />
                      ) : (
                        <Input
                          {...commonInputProps}
                          type={field.type || 'text'}
                        />
                      )}
                      {errors[field.name] && (
                        <div className="form-fields-section__error-message">
                          {errors[field.name]}
                        </div>
                      )}
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    );

};

export default InputFields;