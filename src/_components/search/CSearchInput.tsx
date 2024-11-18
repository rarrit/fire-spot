import React, { forwardRef } from "react";
import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CSearchInput = forwardRef<HTMLInputElement, Props>(
  ({ className, onClick, onKeyDown, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (onClick) {
        onClick(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (onKeyDown) {
          onKeyDown(e);
        }
      }
    };

    return (
      <input
        ref={ref}
        {...props}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={clsx("search_input input_focus_none", className)}
        aria-label="검색어 입력"
      />
    );
  }
);

CSearchInput.displayName = "CSearchInput";

export default CSearchInput;
