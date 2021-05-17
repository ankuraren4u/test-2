import { useFela } from "react-fela";
import classnames from "classnames";
import { getElementPosition } from "./../../utils";
import {
  waveformBarWrapperStyles,
  waveformBarStyles,
  waveforElapsedBarStyles,
  waveforTotalBarStyles,
} from "./styles";

export const WaveformAudioBars = ({
  transcript,
  currentPosition,
  totalTime,
  handleClick,
}) => {
  const { css } = useFela();

  return (
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
  );
};
