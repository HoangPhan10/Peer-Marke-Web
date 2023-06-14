import { API_END_POINT } from "@app/const/common.const";
import { Http } from "@app/services/http";

interface LoginParam {
    email: string;
    password: string;
}

export const login = (params: LoginParam) => {
    return Http.request({
        url: `${API_END_POINT}auth/login`,
        method: 'POST',
        body: params,
    })
}