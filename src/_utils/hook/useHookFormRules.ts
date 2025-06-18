// import { useTranslations } from "next-intl";
// import {
//   isUrlRegex,
//   isEmailRegex,
//   isPhoneRegex,
//   isNumberRegex,
//   isIntegerRegex,
//   strongPasswordRegex,
//   isPhoneWithCodeRegex,
// } from "..";

// type ValidationPattern = {
//   value: RegExp;
//   message: string;
// };

// export type HookFormRules = {
//   required: string;
//   invalidMsg: string;
//   confirmPwMsg: string;
//   passwordPattern: ValidationPattern;
//   isUrlPattern: ValidationPattern;
//   emailPattern: ValidationPattern;
//   isPhonePattern: ValidationPattern;
//   isPhoneWithCodePattern: ValidationPattern;
//   isNumberPattern: ValidationPattern;
//   isIntegerPattern: ValidationPattern;
//   validateEmail: (value: string | { label: string }) => boolean | string;
// };

// export const useHookFormRules = (): HookFormRules => {
//   const t = useTranslations("HookForm");

//   return {
//     required: t("required"),
//     invalidMsg: t("invalid_value"),
//     confirmPwMsg: t("password_mismatch"),
//     passwordPattern: {
//       value: strongPasswordRegex,
//       message: t("weak_password"),
//     },
//     isUrlPattern: { value: isUrlRegex, message: t("invalid_url") },
//     emailPattern: { value: isEmailRegex, message: t("invalid_email") },
//     isPhonePattern: { value: isPhoneRegex, message: t("invalid_phone") },
//     isPhoneWithCodePattern: {
//       value: isPhoneWithCodeRegex,
//       message: t("invalid_phone"),
//     },
//     isNumberPattern: { value: isNumberRegex, message: t("invalid_number") },
//     isIntegerPattern: { value: isIntegerRegex, message: t("invalid_number") },
//     validateEmail: (value) => {
//       console.info({ isEmailValid: value });
//       return (
//         isEmailRegex.test(typeof value === "string" ? value : value.label) ||
//         t("invalid_email")
//       );
//     },
//   };
// };
