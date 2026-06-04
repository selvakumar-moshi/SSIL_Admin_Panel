import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "secondary2" | "tertiary";
  state?: "default" | "hover" | "inactive";
  withIcon?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: any;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  state = "default",
  withIcon = false,
  children,
  onClick,
  loading = false,
  disabled = false,
  className = "",
  icon,
  style,
}) => {
  const getButtonStyles = () => {
    const baseStyles =
      " content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[31px] py-[8px] relative rounded-[20px] size-full font-['Discover_Sans:Semibold',_sans-serif] leading-[16px] not-italic text-[16px] text-nowrap whitespace-pre transition-colors";

    if (disabled || state === "inactive") {
      return `${baseStyles} cursor-not-allowed`;
    }

    // keep structural classes only; colors are driven by inline styles (CSS vars)
    switch (variant) {
      case "secondary":
      case "secondary2":
        return `${baseStyles} border`; // border color will be set via style
      default:
        return baseStyles;
    }
  };

  // compute color styles using CSS variables so colors are configurable in one place
  const colorStyle: React.CSSProperties = (() => {
    if (disabled || state === "inactive") {
      return {
        backgroundColor: "var(--btn-disabled-bg)",
        borderRadius: "20px",
        padding: "8px 31px",
        color: "var(--btn-disabled-text)",
        borderColor: "var(--btn-disabled-bg)",
      };
    }

    switch (variant) {
      case "primary":
        return {
          backgroundColor: "var(--btn-primary-bg)",
          borderRadius: "20px",
          padding: "8px 31px",
          color: "var(--btn-primary-text)",
          ...style,
        };

      case "secondary":
        return {
          backgroundColor: "var(--btn-secondary-bg)",
          borderColor: "var(--btn-primary-bg)",
          borderRadius: "20px",
          padding: "8px 31px",
          color: "var(--btn-secondary-text)",
          border: "1px solid var(--btn-primary-bg)",
        };

      case "secondary2":
        return {
          backgroundColor: "var(--btn-secondary2-bg)",
          color: "var(--btn-secondary2-text)",
          padding: "8px 31px",
          borderColor: "var(--btn-secondary2-text)",
        };

      case "tertiary":
        return {
          backgroundColor: "var(--btn-tertiary-bg)",
          color: "var(--btn-tertiary-text)",
          borderColor: "transparent",
          padding: "8px 31px",
        };

      default:
        return {};
    }
  })();

  return (
    <button
      className={`${getButtonStyles()} ${className}`}
      style={colorStyle}
      onClick={onClick}
      disabled={disabled || state === "inactive" || loading}
      aria-busy={loading}
      data-variant={variant}
      data-state={state}
      data-with-icon={withIcon}
      data-icon={icon}
      data-testid={children}
    >
      {loading ? (
        <span className="button-icon" aria-hidden="true">
          <LoadingOutlined spin />
        </span>
      ) : (
        icon && <span className="button-icon">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default Button;