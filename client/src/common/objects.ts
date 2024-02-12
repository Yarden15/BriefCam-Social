export function toMap<S, K extends string | number, V>(
    arr: S[],
    keyEval: (s: S) => K,
    valueEval: (s: S) => V,
  ): Map<K, V> {
    return arr.reduce<Map<K, V>>((prev, next) => {
      const key = keyEval(next);
      if (prev.has(key)) throw new Error(`duplicate key ${key}`);
      prev.set(key, valueEval(next));
      return prev;
    }, new Map());
  }