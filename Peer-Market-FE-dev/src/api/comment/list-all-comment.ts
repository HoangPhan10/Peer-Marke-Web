import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const listCommentsProduct = () => {
    return Http.request({
        url: `${API_END_POINT}comment/list`,
        method: 'GET',
    })
}