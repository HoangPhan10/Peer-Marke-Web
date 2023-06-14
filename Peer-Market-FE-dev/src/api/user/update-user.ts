import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export function updateUserById(params:any,id:number) {
  return Http.request({
    url: `${API_END_POINT}users/update?id=${id}`,
    method: 'PUT',
    body:params
  })
}