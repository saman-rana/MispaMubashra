import axios from 'axios';
import {BASE_URL} from './apis';

export const getNotification = async details =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(details?.token);
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/notificationApi`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: details,
      });
      const {data} = await response;
      console.log('response here for uservehicleList', response);
      resolve(data);
    } catch (error) {
      console.log('notification', 'error', error);
      reject(error);
    }
  });
