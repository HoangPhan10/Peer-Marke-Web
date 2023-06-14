import { JWT_ACCESS_TOKEN } from '@app/const/common.const';
import Cookies from 'js-cookie';

export function checkUserLogin() {  
  return !!Cookies.get(JWT_ACCESS_TOKEN);
}

export function saveUserCredential(userCredential: any) {
  Cookies.set(JWT_ACCESS_TOKEN, userCredential);
}

export function getAccessToken() {
  return Cookies.get(JWT_ACCESS_TOKEN);
}

export function saveSearchParams(searchParams) {  
  Cookies.set('SEARCH_PARAMS', JSON.stringify(searchParams));
}

export function saveProductPayment(productPayment) {  
  Cookies.set('PRODUCT_PAYMENT', JSON.stringify(productPayment));
}

export function getProductPayment() {
  return Cookies.get('PRODUCT_PAYMENT');
}
export function getSearchParams() {
  return Cookies.get('SEARCH_PARAMS');
}

export function clearUserCredential() {
  Cookies.remove(JWT_ACCESS_TOKEN);
}