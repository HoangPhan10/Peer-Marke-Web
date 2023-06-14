import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export function getListTransport() {
  return Http.request({
    url: `${API_END_POINT}transports`,
    method: 'GET',
  })
}