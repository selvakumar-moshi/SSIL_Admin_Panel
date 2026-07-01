import React from "react";
import { Tooltip } from "antd";
import type { TooltipProps } from "antd";

const DEFAULT_MAX_LENGTH = 20;

export type RenderTruncatedCellOptions = {
  maxLength?: number;
  tooltipPlacement?: TooltipProps["placement"];
  /** Applied to the inner span that wraps the visible (possibly truncated) text */
  className?: string;
  /** Shown when the value is null/undefined/empty after string coercion */
  emptyDisplay?: string;
  /** Browser `title` tooltip instead of Ant Design `Tooltip` */
  useNativeTitle?: boolean;
  /** Test ID for component testing */
  testId?: string;
};

/**
 * Truncates a cell value with an ellipsis. Use for plain string columns or as the display half of {@link renderTruncatedCellWithTooltip}.
 */
export function truncateTableCellText(
  value: unknown,
  maxLength: number = DEFAULT_MAX_LENGTH
): string {
  const text = String(value ?? "");
  if (!text) {
    return "";
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Renders truncated text with a full-value tooltip when the text exceeds `maxLength`.
 */
export function renderTruncatedCellWithTooltip(
  value: unknown,
  options?: RenderTruncatedCellOptions
): React.ReactNode {
  const maxLength = options?.maxLength ?? DEFAULT_MAX_LENGTH;
  const full = String(value ?? "");
  const truncated = truncateTableCellText(full, maxLength);
  const display = truncated || (options?.emptyDisplay ?? "");
  const {
    className,
    tooltipPlacement = "topLeft",
    useNativeTitle,
    testId,
  } = options ?? {};

  const isTruncated = full.length > maxLength;

  if (!isTruncated) {
    return (
      <span className={className} data-testid={testId}> {display} </span>
    );
  }

  if (useNativeTitle) {
    return (
      <span className={className} title={full} data-testid={testId}>
        {display}
      </span>
    );
  }

  return (
    <Tooltip title={full} placement={tooltipPlacement}>
      <span className={className} data-testid={testId}> {display} </span>
    </Tooltip>
  );
}

/**
 * Renders an S3/file URL as a truncated clickable link with full URL in tooltip.
 */
export function renderS3UrlCell(
  value: unknown,
  options?: RenderTruncatedCellOptions
): React.ReactNode {
  const url = String(value ?? "");
  if (!url) {
    return options?.emptyDisplay ?? "-";
  }

  const maxLength = options?.maxLength ?? DEFAULT_MAX_LENGTH;
  const display = truncateTableCellText(url, maxLength);
  const isTruncated = url.length > maxLength;
  const { className, tooltipPlacement = "topLeft", testId } = options ?? {};

  const link = (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-testid={testId}
    >
      {display}
    </a>
  );

  if (!isTruncated) {
    return link;
  }

  return (
    <Tooltip title={url} placement={tooltipPlacement}>
      {link}
    </Tooltip>
  );
}
