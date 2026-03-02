'use server';

import axios, { AxiosRequestConfig } from "axios";
import { ProductsResponse, SingleProductResponse } from "../types/products.types";

export default async function getProducts():Promise<ProductsResponse>{
    try {
        const options:AxiosRequestConfig = {
            url:"https://ecommerce.routemisr.com/api/v1/products",
            method:"GET",
        } 
        const { data } = await axios.request(options);
        return data
    } catch (error) {
        throw error;
    }
}

export async function getproductById({id}:{id:string}):Promise<SingleProductResponse>{
 
    try {
        const options:AxiosRequestConfig ={
            url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method:"GET",
        }
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
        
    }
}


export async function getRelatedProducts(categoryId: string): Promise<ProductsResponse> {
    try {
        const options: AxiosRequestConfig = {
            url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
            method: "GET",
        };
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        throw error;
    }
}