import React from "react";
import Skeleton from "@mui/material/Skeleton";

interface ISkeletonProps {
  width?: string;
  height?: string;
  variant?: "text" | "rectangular" | "rounded" | "circular";
  blue_card?: boolean;
  purple_card?: boolean;
  light_yellow_card?: boolean;
  light_red_card?: boolean;
}
const CustomSkeleton = ({
  width = "100%",
  height = "100%",
  variant = "text",
  blue_card,
  purple_card,
  light_yellow_card,
  light_red_card,
}: ISkeletonProps) => {
  const color = blue_card
    ? "var(--skeleton-bg-blue-color)"
    : purple_card
      ? "var(--skeleton-bg-purple-color)"
      : light_yellow_card
        ? "var(--skeleton-bg-light-yellow-color)"
        : light_red_card
          ? "var(--skeleton-bg-light-red-color)"
          : "var(--skeleton-default-color)";
  return (
    <Skeleton
      animation="wave"
      height={height}
      width={width}
      variant={variant}
      sx={{ bgcolor: color }}
    />
  );
};

export default CustomSkeleton;
