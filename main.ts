import config from './config/config'
import metar from './utils/metar'
import net from './core/net'
import "reflect-metadata"

import { createConnection } from "typeorm";


async function main() {
    config.logger.info(`${config.name} ${config.version} is starting on port ${config.port}`);
    config.databaseConnection = await createConnection({
        type: "mysql",
        host: config.mysql.host,
        port: config.mysql.port,
        username: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database,
        entities: [__dirname + "/database/*.js"],
        synchronize: true,
    })
    // config.logger.debug(`${await metar.getMetarByIcao('ZBAA')}`)
    net.run();
}

main()