import axios, { AxiosResponse } from 'axios';

import config from '../config/config';

async function getMetarByIcao(icao: string) {
  let ret: string = '';
  ret = await (await axios.get(`${config.api.avt7Api}${icao}`)).data.metarContentList.rows[0].content;
  return ret;
}

export default {
  getMetarByIcao,
};
