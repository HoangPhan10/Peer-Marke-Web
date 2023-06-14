import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getListPayment = () => {
    return Http.request({
        url: `${API_END_POINT}payment`,
        method: 'GET',
    })
}