import axios from 'axios';
import {BASE_URL} from './apis';

export const advertisementList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/advertisementlist`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for advertisement', response);
      resolve(data);
    } catch (error) {
      console.log('advertisement', 'error', error);
      reject(error);
    }
  });

export const sparePartList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/sparePartlist`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for sparePart', response);
      resolve(data);
    } catch (error) {
      console.log('sparePart', 'error', error);
      reject(error);
    }
  });

export const expertsList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/expertlist`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for sparePart', response);
      resolve(data);
    } catch (error) {
      console.log('sparePart', 'error', error);
      reject(error);
    }
  });

export const onAddVehicle = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/addVehicle`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          services: details?.services,
          month: 'March',
          day: 'friday',
          time: '123',
          orginization_name: details?.orginization_name,
          vehicle_number: details?.vehicle_number,
          chasis_number: details?.chasis_number,
          engin_number: details?.engin_number,
          contact_number: details?.contact_number,
          address: details?.address,
          pincode: details?.pincode,
          note: details?.note,
          status: 1,
          token: details?.token,
        },
      });
      const {data} = await response;
      console.log('response here for addVehicle', response);
      resolve(data);
    } catch (error) {
      console.log('addVehicle', 'error', error);
      reject(error);
    }
  });

export const sheduleList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/sheduleLists`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          token: details?.token,
        },
      });
      const {data} = await response;
      console.log('response here for sheduleLists', response);
      resolve(data);
    } catch (error) {
      console.log('sheduleList', 'error', error);
      reject(error);
    }
  });

export const sheduleStatusUpdate = async details =>
  new Promise(async (resolve, reject) => {
    // alert(details?.id);
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/updateSheduleStatus/${details?.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          scheduling_status: details?.scheduling_status,
          estimation: details?.estimation_id,
          token: details?.token,
          // job_id: details?.job_id,
        },
      });
      const {data} = await response;
      console.log('response here for sheduleLists', response);
      resolve(data);
    } catch (error) {
      console.log('sheduleList', 'error', error);
      reject(error);
    }
  });

export const companyList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: `${BASE_URL}/companylist`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const {data} = await response;
      console.log('response here for companylist', response);
      resolve(data);
    } catch (error) {
      console.log('companylist', 'error', error);
      reject(error);
    }
  });
