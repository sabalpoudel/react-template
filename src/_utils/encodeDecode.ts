import { isJsonParsable } from "./stringHelpers";

/** Function to encode data to Base64 */
const encodeToBase64 = (data: unknown, stringify = false): string => {
  const processedData = stringify ? JSON.stringify(data) : data;

  if (typeof processedData !== "string") {
    throw new Error(
      "Data must be a string or serializable object when encoding to Base64."
    );
  }

  return Buffer.from(processedData).toString("base64");
};

/** Function to decode a Base64 string */
const decodeFromBase64 = (encodedData: string, parse = false): unknown => {
  try {
    const decodedData = Buffer.from(encodedData, "base64").toString("utf-8");

    if (parse && isJsonParsable(decodedData)) {
      return JSON.parse(decodedData);
    }

    return decodedData;
  } catch (error) {
    console.error("Error decoding Base64:", error);
    return null;
  }
};

export { encodeToBase64, decodeFromBase64 };
