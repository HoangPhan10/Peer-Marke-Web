import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface ProductColorParam {
  colors:[string];
  id_product:number
}

export const createProductColor = (params: ProductColorParam) => {
    return Http.request({
        url: `${API_END_POINT}product-detail/create-color`,
        method: 'POST',
        body: params,
    })
}