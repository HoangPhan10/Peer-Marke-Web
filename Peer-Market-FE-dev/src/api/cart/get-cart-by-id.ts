import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getCartsById = (id:number) => {
    return Http.request({
        url: `${API_END_POINT}carts/get?id=${id}`,
        method: 'GET',
    })
}