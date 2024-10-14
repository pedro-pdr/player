// utils/auth.ts
import Cookies from 'js-cookie';

export const getCodeFromCookie = (): string | undefined => {
  return Cookies.get('userCode');
};

export const setCodeToCookie = (code: string): void => {
  Cookies.set('userCode', code, { expires: 7 });
};

export const removeCodeFromCookie = (): void => {
  Cookies.remove('userCode');
};
