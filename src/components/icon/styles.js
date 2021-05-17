export const iconStyles = ({ type, theme }) => {
  if (type === 'play' || type === 'pause') {
    return {
      ":hover": {
        opacity: "0.8"
      }
    }
  }

  return {
    padding:0,
    maring: 0,
    ":hover path": {
      fill: theme.buttonColor
    }
  }
};
