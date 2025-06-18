const removeNull = (val: any) => {
  if (val == null) return undefined;
  if (Array.isArray(val)) {
    if (val.length === 0) return [];
    for (let i = 0; i < val.length; i++) val[i] = removeNull(val[i]);
  }
  if (val?.constructor === Object) {
    Object.entries(val).forEach(([k, v]) => (val[k] = removeNull(v)));
  }
  return val;
};

const isDev = import.meta.env.VITE_PUBLIC_ENV === "development";
const isProd = import.meta.env.VITE_PUBLIC_ENV === "production";
const isTestIp = import.meta.env.VITE_PUBLIC_ENV === "testing";
const checkIsLocal = import.meta.env.VITE_PUBLIC_HIT_LOCAL_API === "true";

const getKeyByValue = (object: any, value: any) => {
  return Object.keys(object).find((key) => object[key] === value);
};

interface MyObject {
  id?: number;
  [x: string]: any;
}

interface Changes {
  addedArray: MyObject[];
  editedArray: MyObject[];
  deletedArray: MyObject[];
}

const findArrayChanges = (
  initialArray: MyObject[],
  modifiedArray: MyObject[]
): Changes => {
  const addedArray: MyObject[] = [];
  const editedArray: MyObject[] = [];
  const deletedArray: MyObject[] = [];

  // Create a set of IDs for initial and modified arrays
  const initialIds = new Set(initialArray.map((obj) => obj.id));
  const modifiedIds = new Set(modifiedArray.map((obj) => obj.id));

  // Iterate over the modifiedArray to find added and edited objects
  modifiedArray.forEach((obj) => {
    // If the object has no ID or its ID is not present in the initialIds set,
    // it's a newly added object.
    if (!obj.id || !initialIds.has(obj.id)) {
      addedArray.push(obj);
    } else if (initialIds.has(obj.id) && modifiedIds.has(obj.id)) {
      // If the object's ID is present in both the initial and modified arrays,
      // it's an edited object.
      editedArray.push(obj);
    }
  });

  // Iterate over the initialArray to find deleted objects
  initialArray.forEach((obj) => {
    // If the object's ID is not present in the modifiedIds set, it was deleted
    // in the modifiedArray.
    if (!modifiedIds.has(obj.id)) {
      deletedArray.push(obj);
    }
  });

  return { addedArray, editedArray, deletedArray };
};

const findArrayChanges2 = (
  initialArray: MyObject[] = [],
  modifiedArray: MyObject[] = []
): Changes => {
  let addedArray: MyObject[] = [];
  let editedArray: MyObject[] = [];
  let deletedArray: MyObject[] = [];
  let toBeEditedArray: MyObject[] = [];

  const A = initialArray?.length;
  const B = modifiedArray?.length;

  if (A === B) {
    toBeEditedArray = modifiedArray;
  }
  if (B > A) {
    addedArray = modifiedArray.slice(A);
    toBeEditedArray = modifiedArray.slice(0, A);
  }
  if (A > B) {
    deletedArray = initialArray.slice(B);
    toBeEditedArray = modifiedArray.slice(0, B);
  }

  if (toBeEditedArray.length > 0) {
    editedArray = toBeEditedArray.map((i, j) => ({
      ...i,
      id: initialArray[j].id,
    }));
  }

  return { addedArray, editedArray, deletedArray };
};

const isNullUndefined = (v: null | "null" | undefined | "undefined") =>
  [null, "null", undefined, "undefined"].includes(v);

function waitMinutes(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

type RTFindChangedValString = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | Array<string | File>;
};

function arraysAreEqual(
  arr1: Array<string | File>,
  arr2: Array<string | File>
): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((item, index) => item === arr2[index]);
}

function findChangedValString<T extends { [key: string]: unknown }>(
  oldVal: T,
  newVal: RTFindChangedValString
): RTFindChangedValString {
  const changedVal: RTFindChangedValString = {};
  // Iterate through keys of newVal
  for (const key in newVal) {
    if (Object.prototype.hasOwnProperty.call(newVal, key)) {
      const o = oldVal?.[key];
      const n = newVal[key];

      // Check if the new value is not undefined and not the same as oldVal
      if (Array.isArray(o) && Array.isArray(n)) {
        if (!arraysAreEqual(o, n)) {
          changedVal[key] = n;
        }
      } else if (n !== undefined && n !== o) {
        changedVal[key] = n;
      }
    }
  }
  return changedVal;
}

const generateRandomNumber = (min: number = 0, max: number = 100): number => {
  return Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min;
};

type RemoveEmptyValuesOptions = {
  null?: boolean;
  undefined?: boolean;
  emptyString?: boolean;
};

const removeEmptyValues = (
  obj: Record<string, any>,
  options?: RemoveEmptyValuesOptions
): Record<string, any> => {
  const defaultOptions: RemoveEmptyValuesOptions = {
    null: true,
    undefined: true,
    emptyString: true,
  };
  const mergedOptions = { ...defaultOptions, ...options };

  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      const isEmpty =
        (mergedOptions.null && value === null) ||
        (mergedOptions.emptyString && value === "") ||
        (mergedOptions.undefined && value === undefined);
      return !isEmpty;
    })
  );
};

const numberInputOnWheelPreventChange = (e: React.WheelEvent<HTMLElement>) => {
  const target = e.target as HTMLInputElement;

  // Ensure it's a number input before applying changes
  if (target.tagName === "INPUT" && target.type === "number") {
    target.blur();
    e.stopPropagation();

    // Refocus immediately after the event execution
    setTimeout(() => target.focus(), 0);
  }
};

const queryParams = (params: string, url?: string) => {
  const href = url || "";
  const reg = new RegExp("[?&]" + params + "=([^&#]*)", "i");
  const queryString = reg.exec(href);
  return queryString ? queryString[1] : null;
};

export {
  isDev,
  isProd,
  isTestIp,
  checkIsLocal,
  removeNull,
  queryParams,
  waitMinutes,
  getKeyByValue,
  isNullUndefined,
  findArrayChanges,
  findArrayChanges2,
  removeEmptyValues,
  findChangedValString,
  generateRandomNumber,
  numberInputOnWheelPreventChange,
};
