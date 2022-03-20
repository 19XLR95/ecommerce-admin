import axios, { AxiosError } from 'axios';
import {ApiResponseType} from './ApiResponseType';

const login = async (email: string, password: string): Promise<ApiResponseType> => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/login`;
    const res: ApiResponseType = {
        code: 200,
    };

    try {
        const {data} = await axios.post(URL, {
            email: email,
            password: password,
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

const logout = async () => {
    const URL = `${process.env.REACT_APP_API_BASE_URL}/logout`;
    const res: ApiResponseType = {
        code: 204,
    };

    try {
       await axios.get(URL, {
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
    login,
    logout,
};
