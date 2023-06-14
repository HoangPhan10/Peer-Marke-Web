import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

export const listCommentsByProductId = (id:number) => {
    return Http.request({
        url: `${API_END_POINT}comment/product_comment?id=${id}`,
        method: 'GET',
    })
}