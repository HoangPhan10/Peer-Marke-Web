import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface CartParam {
  color:string|undefined;
  size:string|undefined;
  productId: number;
  userId: number;
  total:number;
  quantity: number;
}

export const createCart = (params: CartParam) => {
    return Http.request({
        url: `${API_END_POINT}carts/create`,
        method: 'POST',
        body: params,
    })
}