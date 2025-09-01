import axios from 'axios';
import {BASE_URL} from './apis';

export const onCreditCard = async details =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('here wii card', details);

      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/addCard`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          card_number: details?.card_number,
          card_holder_name: details?.card_holder_name,
          cvv: details?.cvv,
          expiry_date: details?.expiry_date,
          encrypted_exp_year: details?.expiry_date,
          token: details?.token,
        },
      });
      const {data} = await response;
      console.log('response here for creditCard', response);
      resolve(data);
    } catch (error) {
      console.log('creditCard', 'error', error);
      reject(error);
    }
  });

export const onUpdatecardCVV = async details =>
  new Promise(async (resolve, reject) => {
    try {
      console.log({
        cvv: details?.cvv,
        token: details?.token,
      });
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/updatecard`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          cvv: details?.cvv,
          token: details?.token,
          price: details?.amount,
          schedule_id: details?.schedule_id,
        },
      });
      const {data} = await response;
      console.log('response here for updateCardCVV', response);
      resolve(data);
    } catch (error) {
      console.log('updateCardCVV', 'error', error);
      reject(error);
    }
  });

export const creatPaymentList = async details => {
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/create-payment`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for creatPayment', response);
      resolve(data);
    } catch (error) {
      console.log('creatPayment', 'error', error);
      reject(error);
    }
  });
};

export const cardNumberList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/getCardinfo/${details?.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for creditCard', response);
      resolve(data);
    } catch (error) {
      console.log('creditCard', 'error', error);
      reject(error);
    }
  });

export const getJobInvoice = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/invoices/${details?.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for invoices', response);
      resolve(data);
    } catch (error) {
      console.log('invoices', 'error', error);
      reject(error);
    }
  });
