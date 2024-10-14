// Mapped type to transform all properties to string
type AllStrings<T> = {
  [K in keyof T]: string;
};
