import React, { useEffect, useRef } from "react";
import Popover, { type PopoverProps } from "@mui/material/Popover";

type TPopOver = {
  disabled?: boolean;
  closeOnClick?: boolean;
  trigger: React.ReactNode;
  children: React.ReactNode;
  preventDefault?: boolean;
} & Omit<PopoverProps, "open">;

export const CustomPopover: React.FC<TPopOver> = ({
  trigger,
  disabled,
  children,
  preventDefault,
  closeOnClick = true,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  transformOrigin = { vertical: "top", horizontal: "left" },
  ...popoverProps
}) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    return () => clearTimeout(timeoutIdRef?.current);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (preventDefault) event.preventDefault();
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    if (preventDefault) event.preventDefault();

    if (closeOnClick) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => handleClose(), 1000);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "custom-popover" : undefined;

  return (
    <div className="CustomPopover">
      <div
        onClick={handleClick}
        aria-describedby={id}
        className="CustomPopover-trigger"
      >
        {trigger}
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        className="CustomPopover-Popover"
        {...popoverProps}
      >
        <div
          onClick={handleOptionClick}
          className="CustomPopover-Popover-children"
        >
          {children}
        </div>
      </Popover>
    </div>
  );
};
