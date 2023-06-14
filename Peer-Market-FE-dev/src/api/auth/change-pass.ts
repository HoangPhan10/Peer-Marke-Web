import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface ChangePassParams {
    oldPassword: string;
    newPassword: string;
}

export const changePass = (params: ChangePassParams) => {
    return Http.request({
        url: `${API_END_POINT}admin/change-pass`,
        method: 'POST',
        body: params,
    })
}