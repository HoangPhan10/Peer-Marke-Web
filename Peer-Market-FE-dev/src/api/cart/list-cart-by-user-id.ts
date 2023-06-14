import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getCartsByUserId = (id:number) => {
    return Http.request({
        url: `${API_END_POINT}carts/list-by-user-id?id=${id}`,
        method: 'GET',
    })
}