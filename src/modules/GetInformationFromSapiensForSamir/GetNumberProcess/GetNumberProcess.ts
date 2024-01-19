import { requisitiosAxios } from "../../../Axios_Request/Get";
import { requestUrlNumberProcess } from "../../SapiensOperations/Request_Url";

export class GetNumberProcess{
    async execute(id: string, token: string){
        const URL = await requestUrlNumberProcess.execute(id)
        const response = await requisitiosAxios.execute(token, URL)
        return response
    }
}