export function curry<A, B, C>(f: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return function (a: A) {
    return function (b: B) {
      return f(a, b);
    };
  };
}
