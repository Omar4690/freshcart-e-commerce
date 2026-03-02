'use server';
import axios, { AxiosRequestConfig } from "axios";

export const getSubcategoriesOnCategory = async (categoryId: string) => {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data; 
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return { data: [] };
  }
};

export const getSpecificSubcategory = async (subId: string) => {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/subcategories/${subId}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    return data; 
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
};