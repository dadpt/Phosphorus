import net from 'net'
import clientHander from './clientHander'
import config from '../config/config'

function run() {
    let server: net.Server = net.createServer();
    let socketList: any = [];

    server.listen(6809);
    config.logger.info("Server running");
    server.on('connection', (socket: net.Socket) => {
        socketList.push(socket);
        let hander = new clientHander.clientHander(socket);
        hander.hander()
        socket.write("$DISERVER:CLIENT:VATSIM FSD(PROT.SIM) Phosphorus Server V1.00:a4adbbcf1ec835\r\n");
    });

}

export default {
    run
}