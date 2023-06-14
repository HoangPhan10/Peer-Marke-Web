import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getImageByProductId = (id: number) => {
    return Http.request({
        url: `${API_END_POINT}product-detail/product-image?id=${id}`,
        method: 'GET',
    })
}