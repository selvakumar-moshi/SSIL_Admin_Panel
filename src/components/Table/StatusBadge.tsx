
import React from "react";

export interface StatusBadgeProps {
  status: string;
  className?: string;
  style?: React.CSSProperties;
}

/** Maps API/display status strings to theme classes in DFS_StatusBadge / Payhuddle_StatusBadge. */
const getStatusBadgeModifierClass = (status: string): string => {
  const n = status.trim().toLowerCase();
  if (!n) return "status-badge--draft";

  // "Submitted for Approval" contains "approval" — must run before generic "approved"
  if (n.includes("submitted for approval") || n.includes("submitted_for_approval")) return "status-badge--submitted-for-approval";
  if (n.includes("awaiting manager sign off")) return "status-badge--awaiting-manager-sign-off";
  if (n.includes("awaiting") && n.includes("sign off")) return "status-badge--awaiting-sign-off";
  if (n.includes("under review") || n.includes("under_review")) return "status-badge--under-review";
  if (n.includes("rejected")) return "status-badge--rejected";
  if (n.includes("archived")) return "status-badge--archived";
  if (n.includes("draft")) return "status-badge--draft";
  if (n.includes("published")) return "status-badge--published";

  return "status-badge--draft";
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  style,
}) => {
  const modifier = getStatusBadgeModifierClass(status);

  return (
    <div
      className={`status-badge ${modifier} ${className ?? ""}`.trim()}
      style={style}
    >
      <span className="status-badge__text">{status}</span>
    </div>
  );
};

export default StatusBadge;
