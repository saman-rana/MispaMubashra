import axios from 'axios';
import {BASE_URL} from './apis';

export const vehicleList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/uservehicleList`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: details,
      });
      const {data} = await response;
      console.log('response here for uservehicleList', response);
      resolve(data);
    } catch (error) {
      console.log('uservehicleList', 'error', error);
      reject(error);
    }
  });
