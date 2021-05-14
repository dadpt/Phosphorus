import config from './config/config'
import metar from './utils/metar'
import net from './core/net'

async function main() {
    config.logger.info(`${config.name} ${config.version} is starting on port ${config.port}`);
    // config.logger.debug(`${await metar.getMetarByIcao('ZBAA')}`)
    net.run();
}

main()