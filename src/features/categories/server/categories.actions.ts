'use server';

import axios, { AxiosRequestConfig } from "axios";

export const getAllCategories = async () => {
 try {
    const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/categories`,
        method: "GET"
    }
    const { data } = await axios.request(options);
    return data; 
 } catch (error) {
    console.error("API Error:", error);
    return { data: [] };
 }
};


export const getSpecificCategory = async (id: string) => {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      method: "GET",
    };
    
    const { data } = await axios.request(options);
    return data; 
  } catch (error) {
    console.error("API Error fetching specific category:", error);
    return null;
  }
};