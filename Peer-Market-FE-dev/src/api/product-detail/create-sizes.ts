import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface ProductSizeParam {
  sizes:[string];
  id_product:number
}

export const createProductSize = (params: ProductSizeParam) => {
    return Http.request({
        url: `${API_END_POINT}product-detail/create-size`,
        method: 'POST',
        body: params,
    })
}