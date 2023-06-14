import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getProductById = (id: number) => {
    return Http.request({
        url: `${API_END_POINT}product/getProduct-info?id=${id}`,
        method: 'GET',
    })
}