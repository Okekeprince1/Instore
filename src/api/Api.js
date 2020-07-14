import  wretch  from 'wretch';

export const customerApi = wretch('http://192.168.1.100:3000/api/v1/customers');

export const baseApi = wretch('http://192.168.1.100:3000/api/v1');