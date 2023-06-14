import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface AddressParam {
    address: string;
    phone: string;
    name_receiver: string;
    userId:number
}

export const updateAddress = (params: AddressParam) => {
    return Http.request({
        url: `${API_END_POINT}address/update`,
        method: 'PUT',
        body: params,
    })
}