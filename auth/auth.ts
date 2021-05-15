import Users from '../database/Users';
import error from '../define/errors';

const errors = new error.Errors();

async function auth(callsign: string, cid: string,
  password: string, level: string): Promise<number> {
  // TODO: Callsign in use
  const result = await Users.checkLevel(cid, password, parseInt(level, 10));
  if (result === 0) {
    if (callsign.length > 2 && callsign.length < 12) {
      return errors.ERR_OK;
    }
    return errors.ERR_CSINVALID;
  } if (result === -1) {
    return errors.ERR_LEVEL;
  } if (result === -2) {
    return errors.ERR_CIDINVALID;
  }
  return errors.ERR_SYNTAX;
}

export default {
  auth,
};
