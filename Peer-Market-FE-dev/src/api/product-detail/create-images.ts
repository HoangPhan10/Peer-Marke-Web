import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface ProductImageParam {
  title:string;
  urls:[string];
  id_product:number
}

export const createProductImage = (params: ProductImageParam) => {
    return Http.request({
        url: `${API_END_POINT}product-detail/create-image`,
        method: 'POST',
        body: params,
    })
}