import moment from "moment";

export const getDurationInTimeFormat = (num) => {
    return moment.utc(moment.duration(parseFloat(num), "seconds").as('milliseconds')).format('mm:ss');
}

export const getElementPosition = (startTime, endTime, totalTime) => {
    const width =
        ((parseFloat(endTime) - parseFloat(startTime)) * 100) / totalTime;
    const left = (parseFloat(startTime) * 100) / totalTime;

    return {
        width,
        left,
    };
};