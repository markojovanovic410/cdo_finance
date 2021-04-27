import classNames from "classnames";
import { ButtonTypes } from "./types";
import "./index.scss";

export const Button = ({
  children,
  onClick,
  isMain = false,
  disabled = false,
  onMouseEnter,
  onMouseLeave,
}: ButtonTypes) => (
  <button
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    disabled={disabled}
    className={classNames("button", { "--main": isMain }, { "--disabled": disabled })}
  >
    {children}
  </button>
);
