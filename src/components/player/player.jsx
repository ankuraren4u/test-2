import React, { useEffect } from "react";
import {useDispatch} from "react-redux";
import Transcription from "./transcription";
import Waveform from "./waveform";
import PlayBar from "./play-bar";
import {loadAudio} from "./../../actions";

export const Player = ({ audioPath, transcriptPath, enableWaveform }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAudio(audioPath, transcriptPath))
  }, [dispatch, audioPath, transcriptPath]);
    
  return (
    <>
      <PlayBar />
      {enableWaveform && (
        <Waveform />
      )}
      <Transcription />
    </>
  );
};
