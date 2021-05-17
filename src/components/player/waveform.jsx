import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFela } from "react-fela";
import classnames from "classnames";

import { Label } from "../label";
import { updatePosition } from "./../../actions";
import {
  waveformWrapperStyles,
  timeWrapperStyles,
  currentTimeStyle,
  totalTimeStyle,
  waveformBarWrapper1Styles,
  waveformBarWrapperStyles,
  waveformBarStyles,
  waveforElapsedBarStyles,
  waveformSpeakerNameWrapperStyles,
  waveformSpeakerNameStyles,
  waveforTotalBarStyles,
} from "./styles";

import { getDurationInTimeFormat } from "./../../utils";

const getElementPosition = (startTime, endTime, totalTime) => {
  const width =
    ((parseFloat(endTime) - parseFloat(startTime)) * 100) / totalTime;
  const left = (parseFloat(startTime) * 100) / totalTime;

  return {
    width,
    left,
  };
};

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
            <div className={classnames({self:
              p.name === "You"
                ? true
                : false,
                "name": true
            }, css(waveformSpeakerNameStyles))}>
              {p.percentage}% {p.name}
            </div>
          ))}
        </div>
        <div className={css(waveformBarWrapperStyles)} onClick={handleClick}>
          {transcript.word_timings.map((t, idx) => {
            const elements = [];
            const classes = classnames(
              {
                self:
                  transcript.transcript_text[idx].speakerName === "Self"
                    ? true
                    : false,
              },
              css(waveformBarStyles)
            );
            if (
              currentPosition > parseFloat(t[0].startTime) &&
              currentPosition < parseFloat(t[t.length - 1].endTime)
            ) {
              let obj = getElementPosition(
                t[0].startTime,
                currentPosition,
                totalTime
              );
              elements.push(
                <div
                  key={idx}
                  style={{ width: `${obj.width}%`, left: `${obj.left}%` }}
                  className={classnames({ elapsed: true }, classes)}
                ></div>
              );
              obj = getElementPosition(
                currentPosition,
                t[t.length - 1].endTime,
                totalTime
              );
              elements.push(
                <div
                  key={idx}
                  style={{ width: `${obj.width}%`, left: `${obj.left}%` }}
                  className={classnames({ elapsed: false }, classes)}
                ></div>
              );
            } else {
              let obj = getElementPosition(
                t[0].startTime,
                t[t.length - 1].endTime,
                totalTime
              );
              elements.push(
                <div
                  key={idx}
                  style={{ width: `${obj.width}%`, left: `${obj.left}%` }}
                  className={classnames(
                    { elapsed: currentPosition > t[0].startTime },
                    classes
                  )}
                ></div>
              );
            }
            return elements;
          })}
          <div
            style={{
              left: 0,
              width: `100%`,
            }}
            className={("abc", css(waveforTotalBarStyles))}
          ></div>
          <div
            style={{
              left: 0,
              width: `${(currentPosition / totalTime) * 100}%`,
            }}
            className={("abc", css(waveforElapsedBarStyles))}
          ></div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Waveform;
