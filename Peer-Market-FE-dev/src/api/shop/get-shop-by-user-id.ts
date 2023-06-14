import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getShopByUserId = (id: number) => {
    return Http.request({
        url: `${API_END_POINT}shop?id=${id}`,
        method: 'GET',
    })
}