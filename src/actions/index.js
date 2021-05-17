import { PLAYER_STATE } from "./../const"

export const ACTION_TYPES = {
    LOAD_AUDIO: "LOAD_AUDIO",
    UPDATE_PLAYER_STATE: "UPDATE_PLAYER_STATE",
    SEEK: "SEEK",
    UPDATE_CURRENT_TYPE: "UPDATE_CURRENT_TIME"
}

let raf = null;

const updateTime = (dispatch, audio) => {
    raf = requestAnimationFrame(() => {
        dispatch({
            type: ACTION_TYPES.UPDATE_CURRENT_TYPE,
            currentPosition: (audio && audio.currentTime),
            playerState: audio && audio.paused ? PLAYER_STATE.PAUSED : PLAYER_STATE.PLAYING
        });
        updateTime(dispatch, audio);
    });
}

const calculatePercentageParticipation = (transcriptData, duration) => {
    let participationPercentage = [];
    transcriptData && transcriptData.word_timings.forEach((t, idx) => {
        let time = parseFloat(t[t.length - 1].endTime) - parseFloat(t[0].startTime);
        if (transcriptData.transcript_text[idx].speakerName === 'Self') {
            participationPercentage[0] = (participationPercentage[0] || { name: "You", totalTime: 0 });
            participationPercentage[0].totalTime = participationPercentage[0].totalTime + time;
        } else {
            participationPercentage[1] = (participationPercentage[1] || { name: transcriptData.transcript_text[idx].speakerName, totalTime: 0 });
            participationPercentage[1].totalTime = participationPercentage[1].totalTime + time;
        }
    })
    participationPercentage = participationPercentage.map(p => {
        return {
            percentage: parseInt((p.totalTime / duration)* 100),
            ...p
        }
    })
    return participationPercentage;
}

export const loadAudio = (audioPath, transcriptPath) => {
    return async (dispatch, getState) => {
        dispatch({
            type: ACTION_TYPES.LOAD_AUDIO,
            audio: null,
            transcript: null
        });

        const audioFetch = fetch(audioPath);
        const transcriptFetch = fetch(transcriptPath);

        const [audioData, transcriptData] = await Promise.all([
            (await audioFetch).arrayBuffer(),
            (await transcriptFetch).json(),
        ]);

        const blob = new Blob([audioData], { type: "audio/wav" });
        let audio = new Audio(window.URL.createObjectURL(blob));
        const updateState = () => {
            audio.removeEventListener('loadeddata', updateState);

            dispatch({
                type: ACTION_TYPES.LOAD_AUDIO,
                audio,
                transcript: transcriptData,
                currentPosition: 0,
                playerState: PLAYER_STATE.PAUSED,
                totalTime: audio.duration,
                participationPercentage: calculatePercentageParticipation(transcriptData, audio.duration)
            })

        };
        audio.addEventListener('loadeddata', updateState);
    }
}

export const togglePlay = (playerState) => {
    return (dispatch, getState) => {
        const audio = getState() && getState().audio && getState().audio;
        if (playerState === PLAYER_STATE.PLAYING) {
            audio && audio.play();
            raf = updateTime(dispatch, audio);
        } else {
            audio && audio.pause();
            cancelAnimationFrame(raf);
            raf = null;
        }
        dispatch({
            type: ACTION_TYPES.UPDATE_PLAYER_STATE,
            playerState
        });
    }
};

export const updatePosition = (position) => {
    return (dispatch, getState) => {
        const audio = getState() && getState().audio && getState().audio;

        audio && (audio.currentTime = position);
        dispatch({
            type: ACTION_TYPES.SEEK,
            currentPosition: position
        });
    }
}
