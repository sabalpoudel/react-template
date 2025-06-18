import { TLang } from "../_config/config";
import { isDev as checkIsDev, checkIsLocal, isTestIp } from "../_utils";

type TPorts = "3000" | "3007" | "3008" | "3009" | "3010" | "5000";
type TService = "fe" | "main" | "chat" | "partner" | "alter" | "common";

type TServiceObj = { [x in TService]: string };

interface TGenerateURL {
  lang?: TLang;
  port?: TPorts;
  key?: TService;
  isDev?: boolean;
  isTest?: boolean;
  isLocal?: boolean;
  apiPrefix?: string;
  apiVersion?: string;
}

export type { TGenerateURL, TService };

const apiPrefix = "api";
const apiVersion = "v2";

const fePort: TPorts = "3000";
const mainPort: TPorts = "3008";
const chatPort: TPorts = "3009";
const alterPort: TPorts = "3008";
const commonPort: TPorts = "3007"; // database-service
const partnerPort: TPorts = "3010";

const prod: TServiceObj = {
  fe: "https://skysales.jp",
  main: "http://133.242.50.7",
  alter: "https://api.skysales.jp",
  chat: "https://chat.skysales.jp",
  common: "https://database.skysales.jp",
  partner: "https://partner.api.skysales.jp",
};

const devIp: string = "133.242.50.7";
// const devIp: string = "133.242.228.114";
const devAlterIp: string = "52.68.1.178";
const testIp: string = "https://dev-drakos.skysales.jp/";

const dev: TServiceObj = {
  fe: "http://" + devIp,
  main: "http://" + devIp,
  chat: "http://" + devIp,
  common: "http://" + devIp,
  partner: "http://" + devIp,
  alter: "http://" + devAlterIp,
};

const testEnv: TServiceObj = {
  alter: "http://" + devAlterIp,
  fe: "https://dev-drakos.skysales.jp/",
  chat: "https://chat-drakos.skysales.jp/",
  main: "https://dev-drakos.skysales.jp/db",
  common: "https://dev-drakos.skysales.jp/db",
  partner: "https://dev-drakos.skysales.jp/partner",
};

const local = "http://localhost";
const getDomain = checkIsDev ? devIp : isTestIp ? testIp : ".skysales.jp";
const generateURL = ({
  key = "main",
  apiPrefix: ap,
  apiVersion: av,
  port = mainPort,
  isTest = isTestIp,
  isDev = checkIsDev,
  isLocal = checkIsLocal,
}: TGenerateURL): string => {
  const mainEndpoint = isDev
    ? `${isLocal ? local : dev[key]}:${port}`
    : isTest
    ? testEnv[key]
    : prod[key];
  const urlParts = [mainEndpoint];
  if (ap) urlParts.push(ap);
  if (av) urlParts.push(av);
  return urlParts.join("/");
};

const commonProps = {
  apiPrefix,
  apiVersion,
};
const getEndPoint = (key: TService, props?: TGenerateURL): string => {
  console.log({ checkIsLocal, v: process.env.NEXT_PUBLIC_HIT_LOCAL_API });
  switch (key) {
    case "fe":
      return generateURL({
        key: "fe",
        port: fePort,
        isLocal: checkIsLocal,
        ...props,
        // isLocal: true,
      });
    case "partner":
      return generateURL({
        key: "partner",
        port: partnerPort,
        ...commonProps,
        isLocal: checkIsLocal,
        ...props,
      });
    case "alter":
      return generateURL({
        apiPrefix,
        apiVersion: "v1",
        key: "alter",
        port: alterPort,
        isLocal: checkIsLocal,
        ...props,
      });
    case "chat":
      return generateURL({
        key: "chat",
        port: chatPort,
        ...commonProps,
        isLocal: checkIsLocal,
        ...props,
      });
    case "common":
      return generateURL({
        key: "common",
        port: commonPort,
        ...commonProps,
        isLocal: checkIsLocal,
        ...props,
      });
    case "main":
    default:
      return generateURL({
        ...commonProps,
        ...props,
        isLocal: checkIsLocal,
        // isLocal: true,
      });
  }
};

export { getDomain, getEndPoint };
