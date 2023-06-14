import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getProductByShopId = (id: number) => {
    return Http.request({
        url: `${API_END_POINT}product/shop-by-id?id=${id}`,
        method: 'GET',
    })
}