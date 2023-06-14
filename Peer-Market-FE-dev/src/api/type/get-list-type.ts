import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export function getListType() {
  return Http.request({
    url: `${API_END_POINT}product/type`,
    method: 'GET',
  })
}