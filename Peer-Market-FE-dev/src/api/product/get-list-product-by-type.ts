import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getProductByTypeId = (id: number) => {
    return Http.request({
        url: `${API_END_POINT}product/type-by-id?id=${id}`,
        method: 'GET',
    })
}