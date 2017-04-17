// @flow

type Pair = [number, number]

export function mapPair(pair1: Pair, pair2: Pair, f: (a: number, b: number)=>number): Pair {
  return [
    f(pair1[0], pair2[0]),
    f(pair1[1], pair2[1]),
  ]
}

export function map(pair: Pair, f: (a: number, b: ?number)=>number ): Pair {
  return mapPair(pair, [0, 1], f)
}

export function add(pair1: Pair, pair2: Pair): Pair {
  return mapPair(pair1, pair2, (a, b) => a + b);
}

export function subtract(pair1: Pair, pair2: Pair): Pair {
  return mapPair(pair1, pair2, (a, b) => a - b);
}

export function makePair(f: (a: ?number)=>number): Pair {
  return map([0, 1], f);
}
