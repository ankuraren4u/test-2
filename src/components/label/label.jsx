import React from "react";
import classnames from "classnames";
import { useFela } from "react-fela";
import { labelStyles } from "./styles";

export const Label = ({ overrideStyles, children, ...rest }) => {
  const { css } = useFela();

  const inputClass = classnames("ui-label", css(labelStyles, overrideStyles));

  return (
    <span {...rest} className={inputClass}>
      {children}
    </span>
  );
};
