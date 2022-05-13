import logger from "pino"
import dayjs from "dayjs"
import moment from "moment"

//formaterar pino med dayjs som ersätter console.log
export const log = logger({
    prettifier: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

//format the outputted data object
export function formatMessage(username: string, text: string) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}
