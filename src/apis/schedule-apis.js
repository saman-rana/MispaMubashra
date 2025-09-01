import axios from 'axios';
import {BASE_URL} from './apis';

export const addSchedules = async details =>
  new Promise(async (resolve, reject) => {
    console.log('hit');
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/addShedule`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: details,
      });
      const {data} = await response;
      console.log('response here for schedule', response);
      resolve(data);
    } catch (error) {
      console.log('schedule', 'error', error);
      reject(error);
    }
  });
