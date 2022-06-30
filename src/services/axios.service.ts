import { Injectable } from "@nestjs/common";
import axios, { Axios } from "axios";
import { AxiosResponse } from "axios";
import qs from 'qs';
@Injectable()
export class AxiosService {
    private readonly axiosInstance;

    constructor() {
        this.axiosInstance = axios.create(
            {
                baseURL: "localhost/"
            }
        )
    }

    async getRequest<Req, Res>(url: string,params: any, port: number): Promise<AxiosResponse<Res>>{
        const response: AxiosResponse<Res> = this.axiosInstance.get(url, {port: port}, qs.stringify(params));
        return response;
    }

    async postRequest<Req, Res>(url: string, reqBody: Req, port: number): Promise<Res>{
        const response: Res = this.axiosInstance.post(url, {port: port} , reqBody);
        return response;
    }
    
}