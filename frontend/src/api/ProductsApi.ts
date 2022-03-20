import axios, { AxiosError } from 'axios';
import {ApiResponseType} from './ApiResponseType';

const getProducts = async (): Promise<ApiResponseType> => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/products`;
    const res: ApiResponseType = {
        code: 200,
    };

    try {
        const {data} = await axios.get(URL, {
            withCredentials: true
        });

        res.data = data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            res.code = (err as AxiosError).response?.status as number;
            res.data = (err as AxiosError).response?.data;
        }
        else {
            res.code = 999;
            res.data = {
                msg: "Unknown error!"
            };
        }
    }

    return res;
}

const createProduct = async (name: string, brand: string, price: number, inStock: number): Promise<ApiResponseType> => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/products`;
    const res: ApiResponseType = {
        code: 201,
    };

    try {
        const {data} = await axios.post(URL, {
            name: name,
            brand: brand,
            price: price,
            in_stock: inStock,
        }, {
            withCredentials: true
        });

        res.data = data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            res.code = (err as AxiosError).response?.status as number;
            res.data = (err as AxiosError).response?.data;
        }
        else {
            res.code = 999;
            res.data = {
                msg: "Unknown error!"
            };
        }
    }

    return res;
}

const updateProduct = async (id: string, name: string, brand: string, price: number, inStock: number): Promise<ApiResponseType> => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/products/${id}`;
    const res: ApiResponseType = {
        code: 204,
    };

    try {
        await axios.patch(URL, {
            name: name,
            brand: brand,
            price: price,
            in_stock: inStock,
        }, {
            withCredentials: true
        });
    } catch (err) {
        if (axios.isAxiosError(err)) {
            res.code = (err as AxiosError).response?.status as number;
            res.data = (err as AxiosError).response?.data;
        }
        else {
            res.code = 999;
            res.data = {
                msg: "Unknown error!"
            };
        }
    }

    return res;
}

const deleteProduct = async (id: string): Promise<ApiResponseType> => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/products/${id}`;
    const res: ApiResponseType = {
        code: 204,
    };

    try {
        await axios.delete(URL, {
            withCredentials: true
        });
    } catch (err) {
        if (axios.isAxiosError(err)) {
            res.code = (err as AxiosError).response?.status as number;
            res.data = (err as AxiosError).response?.data;
        }
        else {
            res.code = 999;
            res.data = {
                msg: "Unknown error!"
            };
        }
    }

    return res;
}

export {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
