import { API_END_POINT, LIMIT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const getProductByPage = (page:number,id: number) => {
    return Http.request({
        url: `${API_END_POINT}product/shop-by-id-page?page=${page}&limit=${LIMIT}&id=${id}`,
        method: 'GET',
    })
}