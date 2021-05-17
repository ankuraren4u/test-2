import React, { useCallback } from "react";
import classnames from "classnames";
import { useFela } from "react-fela";
import { useSelector, useDispatch } from "react-redux";
import { updatePosition } from "./../../actions";
import { TranscriptionRow } from "./transcript-row";
import { Input } from "../input";
import { transcriptWrapperStyle, searchInputStyles } from "./styles";
const Transcription = () => {
  const { css } = useFela();
  const { transcript, currentPosition } = useSelector((state) => ({
    transcript: state.transcript,
    currentPosition: state.currentPosition,
  }));

  const dispatch = useDispatch();
  const updatePositionHandler = useCallback(
    (pos) => {
      dispatch(updatePosition(pos));
    },
    [dispatch]
  );

  const playerBarClass = classnames(
    "ui-transcript",
    css(transcriptWrapperStyle)
  );
  return transcript ? (
    <div className={playerBarClass}>
      <Input
        type="text"
        placeholder="Search Transcript"
        overrideStyles={searchInputStyles}
      />

      {transcript.word_timings.map((t, idx) => (
        <TranscriptionRow
          key={idx}
          row={t}
          updatePosition={updatePositionHandler}
          currentPosition={currentPosition}
          isSelf={
            transcript.transcript_text[idx].speakerName === "Self"
              ? true
              : false
          }
          isActive={
            currentPosition >= parseFloat(t[0].startTime) &&
            currentPosition < parseFloat(t[t.length - 1].endTime)
          }
        />
      ))}
    </div>
  ) : null;
};

export default Transcription;
