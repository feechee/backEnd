import {createLogger, format, transports} from 'winston'
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const logger = createLogger({
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            level: 'error',
            filename: `${__dirname}/../logs/error.log`,
            format: format.combine(
                format.simple(),
             )

        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            level: 'warn',
            filename: `${__dirname}/../logs/warn.log`,
            format: format.combine(
                format.simple(),
             )

        }),
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.simple(),
             )
        })
    ]
})

export default logger