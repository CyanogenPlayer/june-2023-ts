const calc = (a: number, b: number, cb: (a: number, b: number) => number): number => cb(a, b);

const plus = (a: number, b: number): number => a + b;
const minus = (a: number, b: number): number => a - b;
const multi = (a: number, b: number): number => a * b;

console.log(calc(5, 6, plus));
console.log(calc(5, 6, minus));
console.log(calc(5, 6, multi));
console.log(calc(5, 6, (a, b) => (a + b) * 2) + 100);

type Cb = (min: number, max: number) => any;

const minMax = (arr: number[], cb: Cb): any => cb(Math.min(...arr), Math.max(...arr));

const numbers: number[] = [1, 2, 3, 4, 66, 10];
console.log(minMax(numbers, (min, max) => ({min, max})));
