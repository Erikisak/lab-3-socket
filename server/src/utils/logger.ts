import logger from "pino"
import dayjs from "dayjs"

//formaterar pino med dayjs som ersätter console.log
const log = logger({
    prettifier: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log