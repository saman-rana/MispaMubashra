import axios from 'axios';
import {BASE_URL} from './apis';

export const userList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `dummyjson.com/product`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for users', response);
      resolve(data);
    } catch (error) {
      console.log('users', 'error', error);
      reject(error);
    }
  });
