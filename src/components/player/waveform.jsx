import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFela } from "react-fela";
import classnames from "classnames";

import { Label } from "../label";
import { updatePosition } from "./../../actions";
import { WaveformAudioBars } from "./waveform-audio-bars";
import {
  waveformWrapperStyles,
  timeWrapperStyles,
  currentTimeStyle,
  totalTimeStyle,
  waveformBarWrapper1Styles,
  waveformSpeakerNameWrapperStyles,
  waveformSpeakerNameStyles,
} from "./styles";

import { getDurationInTimeFormat } from "./../../utils";

const Waveform = () => {
  const { css } = useFela();
  const {
    transcript,
    currentPosition,
    totalTime,
    participationPercentage,
  } = useSelector((state) => ({
    transcript: state.transcript,
    currentPosition: state.currentPosition,
    totalTime: state.totalTime,
    participationPercentage: state.participationPercentage,
  }));
  const dispatch = useDispatch();
  const handleClick = useCallback(
    (e) => {
      let clickPosition = e.nativeEvent.clientX - e.currentTarget.offsetLeft;
      let totalWidth = e.currentTarget.offsetWidth;
      let position = (clickPosition / totalWidth) * totalTime;
      dispatch(updatePosition(position));
    },
    [dispatch, totalTime]
  );
  return transcript ? (
    <div className={css(waveformWrapperStyles)}>
      <Label overrideStyles={timeWrapperStyles}>
        <span className={css(currentTimeStyle)}>
          {getDurationInTimeFormat(currentPosition)}
        </span>{" "}
        <span className={css(totalTimeStyle)}>
          {" "}
          / {getDurationInTimeFormat(totalTime)}
        </span>
      </Label>
      <div className={css(waveformBarWrapper1Styles)}>
        <div className={css(waveformSpeakerNameWrapperStyles)}>
          {participationPercentage.map((p) => (
            <div
              className={classnames(
                { self: p.name === "You" ? true : false, name: true },
                css(waveformSpeakerNameStyles)
              )}
            >
              {p.percentage}% {p.name}
            </div>
          ))}
        </div>
        <WaveformAudioBars
          handleClick={handleClick}
          transcript={transcript}
          currentPosition={currentPosition}
          totalTime={totalTime}
        />
      </div>
    </div>
  ) : null;
};

export default Waveform;
