import  wretch  from 'wretch';

const isProd = process.env.NODE_ENV === "production";

export const customerApi = wretch("https://infinite-garden-03597.herokuapp.com/api/v1/customers");

export const baseApi = wretch("https://infinite-garden-03597.herokuapp.com/");