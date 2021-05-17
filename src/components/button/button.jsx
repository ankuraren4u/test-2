import React from "react";
import classnames from "classnames";
import { useFela } from "react-fela";
import { btnStyles, labelStyles } from "./styles";

export const Button = ({ label, icon, handleClick , overrideStyles}) => {
  const { css } = useFela();

  const playerBarClass = classnames("ui-button", css(btnStyles, overrideStyles));
  const labelClass = classnames(css(labelStyles));

  return (
    <button onClick={handleClick} className={playerBarClass}>
      {icon}
      {label ? <span className={labelClass}>{label}</span> : null}
    </button>
  );
};
