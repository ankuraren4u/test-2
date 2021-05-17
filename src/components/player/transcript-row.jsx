import React from "react";
import classnames from "classnames";
import { useFela } from "react-fela";
import { getDurationInTimeFormat } from "./../../utils";
import {
  transcriptRowStyles,
  transcriptRowTimeStyles,
  transcriptRowTextStyles,
  transcriptActiveWordStyles,
} from "./styles";
export const TranscriptionRow = React.memo(
  ({ row, currentPosition, updatePosition, isSelf, isActive }) => {
    const { css } = useFela({
      isSelf,
      isActive
    });
    const transcriptRowClass = classnames(
      "ui-transcript-row",
      css(transcriptRowStyles)
    );
    const transcriptRowTimeClass = classnames(
      "ui-transcript-row-time",
      css(transcriptRowTimeStyles)
    );
    const transcriptRowTextClass = classnames(
      "ui-transcript-row-text",
      css(transcriptRowTextStyles)
    );
    return (
      <div className={transcriptRowClass}>
        <div className={transcriptRowTimeClass}>
          {getDurationInTimeFormat(row[0].startTime)}
        </div>

        <div className={transcriptRowTextClass}>
          {row.map((wordInfo, idx) => {
            const startTime = parseFloat(wordInfo.startTime);
            const endTime = parseFloat(wordInfo.endTime);

            const transcriptWordStyle = classnames(
              {
                "ui-transcript-word": true,
                active:
                  currentPosition >= startTime && currentPosition < endTime,
              },
              css(transcriptActiveWordStyles)
            );

            return (
              <span
                key={idx}
                className={transcriptWordStyle}
                onClick={() => updatePosition(startTime)}
              >
                {wordInfo.word}{" "}
              </span>
            );
          })}
        </div>
      </div>
    );
  }
);
