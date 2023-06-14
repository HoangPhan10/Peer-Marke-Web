import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";
interface JWTParam {
    jwt: string;
}
export function getProfile(params:JWTParam) {
  return Http.request({
    url: `${API_END_POINT}users/get-info`,
    method: 'POST',
    body:params
  })
}