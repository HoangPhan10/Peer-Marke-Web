import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface ProductParam {
  id_type: number;
  product_info_id: number;
  id_shop: number;
  quantity: number;
  description: string;
  price: number;
  title: string;
}

export const createProduct = (params: ProductParam) => {
  return Http.request({
    url: `${API_END_POINT}product/save`,
    method: "POST",
    body: params,
  });
};
