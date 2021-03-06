import net from 'net';
import crypto from 'crypto';
import auth from '../auth/auth';
import client from '../classes/client';
import error from '../define/errors';
import metar from '../utils/metar';
import config from '../config/config';

const errors = new error.Errors();

class ClientHander {
    socket: net.Socket;

    handerlist: any;

    client: client | undefined;

    flag: boolean = true;

    constructor(socket: net.Socket) {
      this.socket = socket;
    }

    send(text: string) {
      // console.log(text);
      config.logger.debug(`Send ${text}`);
      this.socket.write(`${text}\r\n`);
    }

    senderr(errnum: number, env: string) {
      if (this.client) this.send(`$ERserver:${this.client.callsign}:${errnum}:${env}:${errors.getStr(errnum)}`);
      else this.send(`$ERserver:unknown:${errnum}:${env}:${errors.getStr(errnum)}`);
      this.socket.end();
    }

    hander() {
      this.socket.on('data', (data: Buffer) => {
        const strData = data.toString();
        config.logger.debug(`Recive ${strData}`);
        if (strData.startsWith('#AA')) {
          this.handeraa(strData);
        }
        if (strData.startsWith('$AX')) {
          this.handerax(strData);
        }
      });
    }

    async handeraa(text: string) {
      const regex = /^...(.*?):(.*?):(.*?):(.*?):(.*?):(.*?):(.*)/gm;
      const arr = regex.exec(text);
      // console.log(arr);
      if (arr) {
        const callsign = arr[1];
        const realname = arr[3];
        const cid = arr[4];
        const password = arr[5];
        const reqlevel = arr[6];
        const hashPassword = crypto.createHash('md5').update(password).digest('hex');
        const result = await auth.auth(callsign, cid, hashPassword, reqlevel);
        if (result === 0) {
          this.send(`#TMserver:${callsign}:Connected to Phosphorus Server\r\n$CQSERVER:${callsign}:CAPS\r\n$CRSERVER:${callsign}:ATC:Y:${callsign}\r\n$CRSERVER:${callsign}:CAPS:ATCINFO=1:SECPOS=1\r\n$CRSERVER:${callsign}:IP:${this.socket.remoteAddress}`);
        } else {
          this.senderr(result, '');
          this.socket.end();
        }
      }
    }

    async handerax(text: string) {
      const regex = /^...(.*?):(.*?):(.*?):(.*)/gm;
      const arr = regex.exec(text);
      // console.log(arr)
      if (arr) {
        const metarMessage = await metar.getMetarByIcao(arr[4].toUpperCase());
        this.send(`$ARserver:${arr[1]}:METAR:${metarMessage.replace('METAR ', '').replace('SPECI ', '')}`);
      }
    }
}

export default {
  ClientHander,
};
