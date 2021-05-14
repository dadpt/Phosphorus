import net from 'net'
import auth from '../auth/auth'
import client from '../classes/client'
import error from '../define/errors'

const errors = new error.Errors;

class clientHander {
    socket: net.Socket;
    handerlist: any;
    client: client | undefined;
    flag: boolean = true;
    constructor (socket: net.Socket) {
        this.socket = socket;
    }
    send(text: string) {
        this.socket.write(`${text}\r\n`);
    }
    senderr(errnum: number, env: string) {
        if (this.client) this.send(`$ERserver:${this.client.callsign}:${errnum}:${env}:${errors.getStr(errnum)}`);
        else this.send(`$ERserver:unknown:${errnum}:${env}:${errors.getStr(errnum)}`);
        this.socket.end();
    }
    hander() {
        this.socket.on('data', (data: Buffer)=>{
            console.log(data.toString())
            let strData = data.toString().split('\r\n');
            for (let i in strData){
                if (strData[i].startsWith("#AA")) {
                    this.handeraa(strData[i]);
                }
            }
        })
    }
    handeraa(text: string) {
        let regex = /^...(.*?):(.*?):(.*?):(.*?):(.*?):(.*?):(.*)/gm;
        let arr = regex.exec(text);
        console.log(arr);
        if (arr!==null){
            let callsign = arr[1];
            let realname = arr[3];
            let cid = arr[4];
            let password = arr[5];
            let reqlevel = arr[6];
            console.log(auth.auth(cid, password, reqlevel));
            if(auth.auth(cid, password, reqlevel)) {
                this.send("#TMserver:PRC_FSS:Connected to Phosphorus Server");
            } else {
                this.senderr(errors.ERR_CIDINVALID, "");
                this.socket.end();
            }
        }
    }
    
}

export default {
    clientHander
}