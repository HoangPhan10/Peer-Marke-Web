import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface ShopParam {
    name:string,
    id_user:number,
    id_address:number,
    list_transport:any
}

export const createShop = (params: ShopParam) => {
    return Http.request({
        url: `${API_END_POINT}shop/save`,
        method: 'POST',
        body: params,
    })
}