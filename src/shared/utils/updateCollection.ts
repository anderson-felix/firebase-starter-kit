export const updateCollection = <T>(collection: T, params: Partial<T>): void =>
  Object.keys(params).forEach(k => {
    const key = k as keyof T;
    const value = params[key] as T[keyof T];

    if ((collection[key] && value) !== undefined) collection[key] = value;
  });
