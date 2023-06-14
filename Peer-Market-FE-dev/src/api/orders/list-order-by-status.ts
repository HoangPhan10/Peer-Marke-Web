import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const listOrderByStatus = (status?:number) => {
    return Http.request({
        url: `${API_END_POINT}orders/list-status?status=${status}`,
        method: 'GET',
    })
}