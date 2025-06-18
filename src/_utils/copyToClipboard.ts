import { SnackBar } from ".";

export const copyToClipboard = (
  content: string,
  successMessage: string = "copied_successfully",
  errorMessage: string = "copied_failed"
): void => {
  if (typeof window !== "undefined" && "clipboard" in navigator) {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.info(successMessage);
        SnackBar({ message: "copied_successfully" }, "success");
      })
      .catch(() => {
        console.error(errorMessage);
        SnackBar({ message: "error_copying" }, "error");
      });
  } else {
    console.info("Link to be copied:", content);
    console.error("Clipboard API not available in this environment.");
  }
};
