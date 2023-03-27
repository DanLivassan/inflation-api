import axios, { AxiosInstance } from "axios";

export class AxiosPDHClient {
    client: AxiosInstance
    constructor() {
        this.client = axios.create({
            baseURL: 'https://precodahora.ba.gov.br',
            headers: {
                'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
            }
        })
    }
    getClient() {
        return this.client
    }
}