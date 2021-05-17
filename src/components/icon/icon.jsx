import Play from "./../../icons/play";
import Pause from "./../../icons/pause";
import Share from "./../../icons/share";
import SeekBack from "./../../icons/seek-back";
import SeekFwd from "./../../icons/seek-fwd";

import { useFela } from "react-fela";
import { iconStyles } from "./styles";

/*TODO: Lazy Load */
export const Icon = ({ type }) => {
  const { css } = useFela({type});

  const classes = css(iconStyles);
  
  let Component = null;
  if (type === "play") {
    Component = Play;
  }
  if (type === "pause") {
    Component = Pause;
  }
  if (type === "share") {
    Component = Share;
  }
  if (type === "backward") {
    Component = SeekBack;
  }
  if (type === "forward") {
    Component = SeekFwd;
  }

  return Component ? <span className={classes}><Component  /></span>: <></>;
};
