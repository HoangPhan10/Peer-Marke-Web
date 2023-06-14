import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export function deleteUserById(id:number) {
  return Http.request({
    url: `${API_END_POINT}users/delete?id=${id}`,
    method: 'DELETE',
  })
}