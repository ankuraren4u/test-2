import moment from "moment";

export const getDurationInTimeFormat = (num) => {
    return moment.utc(moment.duration(parseFloat(num), "seconds").as('milliseconds')).format('mm:ss');
}