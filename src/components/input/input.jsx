import React from "react";
import classnames from "classnames";
import { useFela } from "react-fela";
import { inputStyles } from "./styles";

export const Input = ({  overrideStyles, ...rest }) => {
  const { css } = useFela();

  const inputClass = classnames("ui-input", css(inputStyles, overrideStyles));

  return <input className={inputClass} {...rest} />;
};
