import { throwError } from 'rxjs'
import { ajax, AjaxRequest, AjaxResponse, } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { clearUserCredential, getAccessToken } from '@app/services/auth'

export const handleError = (requestOpts: RequestOptions) => (error: AjaxResponse<JsonResponse<any>>) => {
  if (error.status === 401) {
    clearUserCredential();
    window.location.href = '/auth/login';
  }

  if (requestOpts.onError === 'throwOriginal') {
    return throwError(() => error);
  }

  return throwError(() => error.response);
}

interface RequestOptions {
  url: string;
  body?: any;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  headers?: any;

  /**
   * Strategy for error hanlding.
   * - 'throwRes': throw error payload  only.
   * - 'throwOriginal': throw original error object of Rxjs/ajax.
   * 
   * Default: 'throwRes'.
   */
  onError?: 'throwRes' | 'throwOriginal',
}

interface JsonResponse<Data> {
  responseCode?: number | string;
  message?: string;
  data: Data;
}

export class Http {
  public static request<Data = any>(requestOpts: RequestOptions) {
    let accessToken: string | undefined = '';
    
    if (typeof window !== 'undefined') {
      accessToken = getAccessToken();
    }
    
    const ajaxRequest: AjaxRequest = {
      ...requestOpts,
      async: true,
      crossDomain: true,
      responseType: 'json',
      timeout: 100000,
      withCredentials: false,
      headers: requestOpts.headers ? {
        ...requestOpts.headers,
      } : {
        'Content-Type': 'application/json',
      }
    };

    if (accessToken) {
      (ajaxRequest as any).headers['Authorization'] = `Bearer ${accessToken}`;
    }
    (ajaxRequest as any).headers['os-type'] = 'android';
    (ajaxRequest as any).headers['os-version'] = '1.5.0';
    (ajaxRequest as any).headers['app-version'] = '1.5.0';


    return ajax(ajaxRequest).pipe(
      catchError(handleError(requestOpts)),
      map<AjaxResponse<any>, JsonResponse<Data>>(res => res.response),
    );
  }
}
