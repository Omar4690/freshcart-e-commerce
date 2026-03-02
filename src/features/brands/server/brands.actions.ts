

import axios, { AxiosRequestConfig } from "axios";

export const getAllBrands = async () => {
  try {
    const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/brands`,
        method: "GET"
    }
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { data: [] };
  }
};
export const getBrandById = async (id: string) => {
  try {
     const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`, 
        method: "GET"
    }
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("Error fetching specific brand:", error);
    return null;
  }
};

export const getProductsByBrand = async (brandId: string) => {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
      method: "GET"
    }
    const { data } = await axios.request(options);
    console.log(options.data);
    
    return data;
  } catch (error) {
    console.error("Error fetching products for brand:", error);
    return { data: [] };
  }
};