import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface ProductInfoParam {
  trade_mark:string,
  material:string,
  sample:string,
  style:string,
  origin:string,
  season:string,
  tall_fit:string,
  very_big:string,
  design:string,
  collar:string,
}

export const createProductInfo = (params: ProductInfoParam) => {
    return Http.request({
        url: `${API_END_POINT}product-detail/create-product-info`,
        method: 'POST',
        body: params,
    })
}