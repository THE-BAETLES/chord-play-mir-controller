import { Injectable } from "@nestjs/common";
import axios, { Axios } from "axios";
import { AxiosResponse } from "axios";
import * as qs from 'qs'

@Injectable()
export class AxiosService {
    private readonly axiosInstance;

    constructor() {
        this.axiosInstance = axios.create(
        )
    }

    async getRequest<Req, Res>(url: string,params: any, port: number): Promise<AxiosResponse<Res>>{

        const response: AxiosResponse<Res> = this.axiosInstance.get(`http://localhost:${port}${url}`,{params});
        return response;
    }

    async postRequest<Req, Res>(url: string, reqBody: Req, port: number): Promise<Res>{
        const response: Res = this.axiosInstance.post(`http://localhost:${port}${url}`, reqBody);
        return response;
    }
    
}