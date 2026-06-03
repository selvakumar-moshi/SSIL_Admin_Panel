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
            return (
              <div key={field.name} className="form-fields-section__field">
                  <div className="ant-row ant-form-item">
                    <div className="ant-form-item-label">
                      <label className={field.required ? "ant-form-item-required" : ""}>
                        {field.label}
                        {field.required && <span className="form-fields-section__required">*</span>}
                      </label>
                    </div>
                    <div className="ant-form-item-control">
                      <Input
                        placeholder={field.placeholder}
                        type={field.type || 'text'}
                        status={hasError ? "error" : undefined}
                        className={
                          !field.search ? "form-fields-section__input" : "form-fields-section__input2"
                        }
                        prefix={field.prefix}
                        value={values[field.name] || ''}
                        onChange={(e) => onChange?.(field.name, e.target.value)}
                        disabled={disabled || field.disabled}
                        data-testid={`input-${field.name}`}
                      />
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