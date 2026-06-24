
import React from "react";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export interface PopupModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onSecondaryClick?: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showFooter?: boolean;
  className?: string;
  contentHeight?: number | string;
  minHeight?: number | string; 
  maxHeight?: number | string;
  primaryButtonDisabled?: boolean;
  secondaryButtonDisabled?: boolean;
  hideButtons?: boolean;
  primaryButtonLoading?: boolean;
  secondaryButtonLoading?: boolean;
}

const PopupModal: React.FC<PopupModalProps> = ({
  open,
  onClose,
  onSubmit,
  onSecondaryClick,
  title,
  subtitle,
  children,
  primaryButtonText = "Primary",
  secondaryButtonText = "Secondary",
  showFooter = true,
  className,
  contentHeight = "auto",
  minHeight = 250, 
  maxHeight = 431,
  primaryButtonDisabled = false,
  secondaryButtonDisabled = false,
  hideButtons = false,
  primaryButtonLoading = false,
  secondaryButtonLoading = false,
}) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      handleCancel();
    }
  };

  const contentStyle: React.CSSProperties = {
    height: contentHeight,
    minHeight: minHeight,
    maxHeight: maxHeight,
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
      width={627}
      className={`popup-modal ${className || ""}`}
      closable={false}
      centered
    >
      {/* Header */}
      <div className="popup-modal__header">
        <div className="popup-modal__title-section">
          <h2 className="popup-modal__title">{title}</h2>
          <p className="popup-modal__subtitle">{subtitle}</p>
        </div>
        <button
          type="button"
          className="popup-modal__close"
          onClick={handleCancel}
          aria-label="Close"
          data-testid="close-button"
        >
          <CloseOutlined />
        </button>
      </div>

      {/* Content */}
      <div className="popup-modal__content" style={contentStyle}>
        {children}
      </div>

      {/* Footer */}
      {showFooter && (
        <div className="popup-modal__footer">
          <div className="popup-modal__buttons">
            {!hideButtons && (
                <Button
                  type="default"
                  onClick={handleSecondaryClick}
                  className="popup-modal__button popup-modal__button--secondary"
                  disabled={secondaryButtonDisabled}
                  loading={secondaryButtonLoading}
                  data-testid={secondaryButtonText}
                >
                  {secondaryButtonText}
                </Button>
            )}
            <Button
              type="primary"
              onClick={handleSubmit}
              className="popup-modal__button popup-modal__button--primary"
              disabled={primaryButtonDisabled}
              loading={primaryButtonLoading}
              data-testid={primaryButtonText}
            >
              {primaryButtonText}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PopupModal;
