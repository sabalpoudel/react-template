import Cookies from "js-cookie";
import { encodeToBase64 } from ".";
import { getDomain } from "../api/endpoint";

// **************************** Local Storage *****************************
export const getItemLocal = (n: string) => localStorage.getItem(n);
export const removeItemLocal = (n: string) => localStorage.removeItem(n);
export const setItemLocal = (n: string, v: any) => localStorage.setItem(n, v);
type LocalStorageItem = {
  [key: string]: any;
};
export const getLocalStorage = (key: string): any => {
  const localKey = encodeToBase64("partner-dash");
  const encodedKey = encodeToBase64(key);
  const storedData: LocalStorageItem = JSON.parse(
    localStorage?.getItem?.(localKey) || "{}"
  );
  return storedData[encodedKey];
};
export const updateLocalStorage = (
  key: string,
  value: string,
  action: "set" | "remove" = "set"
): void => {
  const localKey = encodeToBase64("partner-dash");
  const encodedKey = encodeToBase64(key);
  const storedData: LocalStorageItem = JSON.parse(
    localStorage?.getItem?.(localKey) || "{}"
  );
  if (action === "remove") delete storedData[encodedKey];
  if (action === "set") storedData[encodedKey] = value;
  localStorage?.setItem?.(localKey, JSON.stringify(storedData));
};

// **************************** Session Storage ****************************
export const getItem = (n: string) => sessionStorage.getItem(n);
export const removeItem = (n: string) => sessionStorage.removeItem(n);
export const setItem = (n: string, v: any) => sessionStorage.setItem(n, v);

// **************************** Cookies ************************************
export const setCookie = (n: string, v: string) =>
  Cookies.set(n, v, {
    expires: 90,
    SameSite: "Lax",
    domain: window?.location?.origin?.includes("localhost")
      ? "localhost"
      : getDomain,
  });
export const getCookie = (n: string) => Cookies.get(n);
export const removeCookie = (n: string) =>
  Cookies.remove(n, {
    SameSite: "Lax",
    domain: window?.location?.origin?.includes("localhost")
      ? "localhost"
      : getDomain,
  });
