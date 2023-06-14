import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export function getListUsers(limit: number,page: number) {
  return Http.request({
    url: `${API_END_POINT}users?limit=${limit}&page=${page}`,
    method: 'GET',
  })
}