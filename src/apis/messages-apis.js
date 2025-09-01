import axios from 'axios';
import {BASE_URL} from './apis';

export const onSendMessage = async details =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Api Request', {
        message: details?.message,
        shedule_id: details?.shedule_id,
        token: details?.token,
      });
      const response = await axios({
        method: 'post',

        url: `${BASE_URL}/send/2`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          message: details?.message,
          shedule_id: details?.shedule_id,
          token: details?.token,
        },
      });
      const {data} = await response;
      console.log('response here for sendMessage', response);
      resolve(data);
    } catch (error) {
      console.log('sendMessage', 'error', error);
      reject(error);
    }
  });

export const jobList = async details =>
  new Promise(async (resolve, reject) => {
    // alert(details?.id);
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/job/${details?.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for jobList', response);
      resolve(data);
    } catch (error) {
      console.log('jobList', 'error', error);
      reject(error);
    }
  });
 