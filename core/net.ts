import net from 'net';
import clientHander from './clientHander';
import config from '../config/config';

function run() {
  const server: net.Server = net.createServer();
  const socketList: any = [];

  server.listen(6809);
  config.logger.info('Server running');
  server.on('connection', (socket: net.Socket) => {
    socketList.push(socket);
    const hander = new clientHander.ClientHander(socket);
    hander.hander();
    socket.write('$DISERVER:CLIENT:VATSIM FSD(PROT.SIM) Phosphorus Server V1.00:a4adbbcf1ec835\r\n');
  });
}

export default {
  run,
};
