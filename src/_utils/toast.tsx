import { type ExternalToast, toast } from "sonner";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { getLang } from "@lang/utils/getLang";
import { toastTranslate } from "@lang/TranslationsToast";

type TToast = ExternalToast & { message: string; doNotTranslate?: boolean };
type TSnackBarType =
  | "success"
  | "error"
  | "loading"
  | "warning"
  | "dismiss"
  | "info";

export type { TSnackBarType };
const SnackBar = (
  { message: m, doNotTranslate = false, ...rest }: TToast,
  type?: TSnackBarType,
  toastId?: string | number
) => {
  const lang = getLang();

  const message = doNotTranslate ? m : toastTranslate[lang][m];

  if (type === "success")
    return toast.success(message, {
      style: {
        background: "var(--success)",
        color: "var(--success-text)",
        borderColor: "var(--success-dark)",
      },
      ...rest,
    });

  if (type === "info")
    return toast.info(message, {
      style: {
        background: "var(--primary)",
        color: "var(--primary-text)",
        borderColor: "var(--primary-dark)",
      },
      ...rest,
    });

  if (type === "error")
    return toast.error(message, {
      style: {
        background: "var(--error)",
        color: "var(--error-text)",
        border: "1px solid var(--error-dark)",
      },
      ...rest,
    });

  if (type === "loading")
    return toast.loading(message, {
      style: {
        background: "var(--secondary)",
        color: "var(--secondary-text)",
        borderColor: "var(--secondary-dark)",
      },
      ...rest,
    });

  if (type === "warning")
    return toast(message, {
      icon: <WarningAmberIcon />,
      style: {
        background: "var(--warning)",
        color: "var(--warning-text)",
        borderColor: "var(--warning-dark)",
      },
      ...rest,
    });

  if (type === "dismiss") return toast.dismiss(toastId);
  return toast(message, {
    ...rest,
  });
};

export { SnackBar };
