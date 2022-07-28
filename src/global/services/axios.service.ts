import { Injectable } from "@nestjs/common";
import axios, { Axios } from "axios";
import { AxiosResponse } from "axios";
@Injectable()
export class AxiosService {
    private readonly axiosInstance;
    constructor() {
        this.axiosInstance = axios.create()
    }

    async getRequest<Req, Res>(url: string,params: any): Promise<AxiosResponse<Res>>{

        const response: AxiosResponse<Res> = this.axiosInstance.get(url,{params});
        return response;
    }

    async postRequest<Req, Res>(url: string, reqBody: Req): Promise<Res>{
        const response: Res = this.axiosInstance.post(url, reqBody);
        return response;
    }
    
}