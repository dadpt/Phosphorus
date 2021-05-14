import { consoleLogger, noopLogger, Logger } from 'typescript-log'

const logsToConsoleLogger: Logger = consoleLogger(
    /* optional, warn default */ 'debug',
);

export default {
    name: 'Phosphorus',
    version: '0.0.1',
    port: 6809,
    mysql: {
        host: 'localhost',
        user: 'root',
        password: 'rppt123',
        database: 'phosphorus'
    },
    api: {
        avt7Api: "http://www.avt7.com/Home/AirportMetarInfo?airport4Code="
    },
    logger: logsToConsoleLogger
}