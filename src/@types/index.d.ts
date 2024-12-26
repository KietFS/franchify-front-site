declare module "@heroicons/react/outline";
declare module "styled-components";

declare interface String {
  truncate: (num: number) => string;
  prettyMoney: () => string;
  prettyDate: () => string;
  prettyDateTime: () => string;
}

declare interface Array<T> {
  has: (item: T) => boolean;
}
