import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const listOrderByUserIdAndStatus = (id:number,status?:number) => {
    return Http.request({
        url: `${API_END_POINT}orders/list-users?id=${id}&status=${status}`,
        method: 'GET',
    })
}