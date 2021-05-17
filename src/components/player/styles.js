export const playerBarStyles = ({ theme }) => ({
  backgroundColor: theme.lightGreyColor,
  padding: "12px 20px",
  display: "flex",
  alignItems: "center"
});

export const shareButtonStyle = ({ theme }) => ({
  marginLeft: "auto",
  background: theme.whiteColor,
  color: theme.darkGrey,
  borderRadius: theme.borderRadius,
  display: "flex",
  alignItems: "center",
  padding: "5px 20px"
});

export const waveformWrapperStyles = ({ theme }) => ({
  backgroundColor: theme.subHeaderColor,
  padding: "20px"
})

export const timeWrapperStyles = ({ theme }) => ({
  marginBottom: "20px",
  display: "inline-block",
  padding: "2px 7px"
})

export const currentTimeStyle = ({ theme }) => ({
  color: theme.darkGrey2
})

export const totalTimeStyle = ({ theme }) => ({
  color: theme.darkGrey
})

export const transcriptWrapperStyle = ({ theme }) => ({
  padding: '20px 0',
  display: "flex",
  flexDirection: "column"
})

export const searchInputStyles = ({ theme }) => ({
  flex: 1,
  margin: "0 20px",
  background: "url('/magnifier.svg') no-repeat 15px center"
})

export const waveformBarWrapper1Styles = ({ theme }) => ({
  display: "flex",
  height: '67px',
  alignItems: "center"
})

export const waveformSpeakerNameWrapperStyles = ({ theme }) => ({
  height: 0,
  top: '0px',
  position: "relative",
  paddingRight: "15px",
  borderTop: `1px solid ${theme.lightGreyColor}`,
})

export const waveformSpeakerNameStyles = ({ theme }) => ({
  marginBottom: "22px",
  marginTop: "-30px",
  color: theme.otherColor,
  "&.self": {
    color: theme.selfColor
  },
  "& ~ .name": {
    marginTop: 0,
    marginBottom: 0
  }
})

export const waveformBarWrapperStyles = ({ theme }) => ({
  flex: 1,
  height: "67px",
  position: "relative",
  cursor: 'pointer',
  "&:before": {
    content: '" "',
    borderLeft: `1px solid ${theme.lightGreyColor}`,
    position: 'absolute',
    top: "0px",
    bottom: 0,
    margin: "auto",
    height: "12px"
  },
  "&:after": {
    content: '" "',
    borderLeft: `1px solid ${theme.lightGreyColor}`,
    position: 'absolute',
    top: "0",
    margin: "auto",
    bottom: 0,
    height: "12px",
    right: 0
  }
})
export const waveforTotalBarStyles = ({ theme }) => ({
  left: "0px",
  top: 0,
  bottom: "0px",
  margin: "auto",
  height: 0,
  position: "absolute",
  borderTop: `1px solid ${theme.lightGreyColor}`
})

export const waveforElapsedBarStyles = ({ theme }) => ({
  left: "0px",
  top: 0,
  bottom: "0px",
  margin: "auto",
  height: 0,
  position: "absolute",
  borderTop: `1px solid ${theme.borderDarkColor}`
})

export const waveformBarStyles = ({ theme }) => ({
  background: "url('/waveform-bar-blue.svg') repeat-x",
  height: "25px",
  position: "absolute",
  top: "40px",
  "&.self": {
    background: "url('/waveform-bar-green.svg') repeat-x",
    top: '2px'
  },
  "&.elapsed": {
    background: "url('/waveform-bar-grey.svg') repeat-x"
  }
})

export const transcriptRowStyles = ({ isSelf, isActive, theme }) => ({
  marginTop: '24px',
  maxWidth: "600px",
  display: "flex",
  marginLeft: isSelf && "53px",
  padding: isActive ? "16px 20px" : "0 20px",
  color: theme.darkGrey,
  backgroundColor: isActive && (isSelf ? theme.selfBackgroundColor : theme.otherBackgroundColor)
})


export const transcriptRowTimeStyles = ({ isSelf, theme, isActive }) => ({
  width: "52px",
  borderRight: `1px solid ${isSelf ? theme.selfColor : theme.otherColor}`,
  color: isSelf ? theme.selfColor : theme.otherColor,

})

export const transcriptRowTextStyles = ({ theme }) => ({
  flex: 1,
  marginLeft: "10px"
})

export const transcriptActiveWordStyles = ({ isSelf, theme }) => {
  return {
    marginRight: "4px",
    "&.active": {
      display: 'inline-block',
      backgroundColor: isSelf ? theme.selfColor : theme.otherColor,
    }
  }
}

