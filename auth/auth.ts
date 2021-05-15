import Users from '../database/Users'
import error from '../define/errors'
const errors = new error.Errors;

async function auth(callsign: string, cid: string, password: string, level: string): Promise<number> {
    // TODO: Callsign in use
    let result = await Users.checkLevel(cid, password, parseInt(level));
    if(result == 0) {
        if(callsign.length > 2 && callsign.length < 12){
            return errors.ERR_OK;
        } else {
            return errors.ERR_CSINVALID;
        }
    } else if(result == -1) {
        return errors.ERR_LEVEL;
    } else if(result == -2){
        return errors.ERR_CIDINVALID;
    }
}

export default {
    auth
}