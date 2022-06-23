import { Injectable } from "@nestjs/common";
import axios from "axios";
import qs from 'qs';
@Injectable()
export class AxiosService<Req, Res> {
    private readonly axiosInstance;
    constructor() {
        this.axiosInstance = axios.create(
            {
                baseURL: "localhost/"
            }
        )
    }
    async getRequest(url: string,params: any, port: number): Promise<Res>{
        const response: Res = this.axiosInstance.get(url, {port: port}, qs.stringify(params));
        return response;
    }

    async postRequest(url: string, reqBody: Req, port: number): Promise<Res>{
        const response: Res = this.axiosInstance.post(url, reqBody);
        return response;
    }
}