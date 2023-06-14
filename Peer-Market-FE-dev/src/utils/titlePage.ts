import { PATH } from "@app/const/list-path.const";

export const checkPathReturnTitle =(path: string): string =>{
    const title = PATH.find(el=>path.includes(el.path));
    return title.name?title.name:"";
}