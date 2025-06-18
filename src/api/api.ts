import { getLang } from "../lang/utils/getLang";
import { checkIsLocal, extractFromCookies } from "../_utils";
import { type TService, getEndPoint } from "./endpoint";

type RequestOptions = RequestInit & {
  isAuth?: boolean;
  endpoint?: TService;
  formData?: FormData;
  headers?: HeadersInit;
  isLocal?: boolean;
  data?: Record<string, any>;
};

type SWRReqOpt = {
  arg?: RequestOptions;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMessage = await response.text();
    console.error({ handleResponse: errorMessage });
    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
};
const createRequest = async <T>(
  url: string,
  method: string,
  options: SWRReqOpt = {}
): Promise<T> => {
  try {
    // await waitMinutes(2000);
    const { arg } = options;
    const {
      data,
      headers,
      formData,
      isAuth = true,
      endpoint = "main",
      isLocal = checkIsLocal,
      ...rest
    } = arg || {};

    const lang = getLang();
    const authToken = extractFromCookies("token");
    const requestHeaders = new Headers({ ...headers });

    const link = getEndPoint(endpoint, { isLocal }) + `/${lang}${url}`;
    // const link2 = getEndPoint("alter") + `/${lang}${url}`;

    if (isAuth && authToken?.access_token) {
      requestHeaders.set("Authorization", authToken?.access_token);
    }
    if (data && !requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }

    // const alterFetch = () => {
    //   try {
    //     fetch(link2, {
    //       method,
    //       headers: requestHeaders,
    //       body: formData ? formData : JSON.stringify(data),
    //       ...rest,
    //     });
    //   } catch (error) {}
    // };
    // alterFetch();
    const response = await fetch(link, {
      method,
      headers: requestHeaders,
      body: formData ? formData : JSON.stringify(data),
      ...rest,
    });

    return await handleResponse<T>(response);
  } catch (error) {
    console.error({ [`createRequest_${url}_error`]: error });
    throw error;
  }
};

const GetApi = <T>(url: string, options: SWRReqOpt): Promise<T> =>
  createRequest<T>(url, "GET", options);

const PostApi = <T>(url: string, options: SWRReqOpt): Promise<T> =>
  createRequest<T>(url, "POST", options);

const PatchApi = <T>(url: string, options: SWRReqOpt): Promise<T> =>
  createRequest<T>(url, "PATCH", options);

const DeleteApi = <T>(url: string, options: SWRReqOpt): Promise<T> =>
  createRequest<T>(url, "DELETE", options);

export { GetApi, PostApi, PatchApi, DeleteApi };
export type { SWRReqOpt };
