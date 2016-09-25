declare module "lodash" {
  declare function flatten<S>(a: S[][] | S[]): S[];

  declare function times<S>(num: number, func: (index: number) => S): S[];

  declare function compact<S>(a: Array<?S>): S[];

  declare function pick(obj: Object): Object;

  declare function random(a: number, b: number): number;
  declare function random(a: number): number;

  declare function sample<S>(a: S[]): S;

  declare function sumBy<S>(a: S[], func: (x: S) => number): number;
}
