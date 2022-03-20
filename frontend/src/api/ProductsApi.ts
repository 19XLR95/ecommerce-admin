import axios, { AxiosError } from 'axios';
import {ApiResponseType} from './ApiResponseType';

const getProducts =async (): Promise<ApiResponseType> => {
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

export {
    getProducts,
};