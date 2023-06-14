import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";
interface ParamPaymentVnpay{
  content_pay: string;
  amount: number;
  list_id_order: number[]
}

export const createPaymentVnpay = (params: ParamPaymentVnpay) => {
    return Http.request({
        url: `${API_END_POINT}payment/vnpay`,
        method: 'POST',
        body: params,
    })
}