import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFela } from "react-fela";
import classnames from "classnames";
import { Button } from "../button";
import { PLAYER_STATE, PLAY_TYPE, PAUSE_TYPE } from "./../../const";
import { togglePlay, updatePosition } from "./../../actions";
import { playerBarStyles, shareButtonStyle } from "./styles";
import { Icon } from "../icon";

export const PlayBar = () => {
  const { audio, playerState, currentPosition } = useSelector((state) => ({
    audio: state.audio,
    playerState: state.playerState,
    currentPosition: state.currentPosition,
  }));
  const dispatch = useDispatch();
  const { css } = useFela();

  const playPauseButtonIconType =
    playerState === PLAYER_STATE.PLAYING ? PAUSE_TYPE : PLAY_TYPE;
  const playPauseButtonIcon = <Icon type={playPauseButtonIconType} />;
  const seekFwdIcon = <Icon type="forward" />;
  const seekBackIcon = <Icon type="backward" />;
  const shareIcon = <Icon type="share" />;
  const playerBarClass = classnames("ui-playbar", css(playerBarStyles));

  return audio ? (
    <div className={playerBarClass}>
      <Button
        icon={seekBackIcon}
        handleClick={() => {
          dispatch(updatePosition(currentPosition - 10));
        }}
      />
      <Button
        icon={playPauseButtonIcon}
        handleClick={() => {
          const newState =
            playerState === PLAYER_STATE.PLAYING
              ? PLAYER_STATE.PAUSED
              : PLAYER_STATE.PLAYING;
          dispatch(togglePlay(newState));
        }}
      />
      <Button
        icon={seekFwdIcon}
        handleClick={() => {
          dispatch(updatePosition(currentPosition + 10));
        }}
      />
      <Button
        icon={shareIcon}
        label="Share"
        overrideStyles={shareButtonStyle}
      />
    </div>
  ) : null;
};

export default PlayBar;
