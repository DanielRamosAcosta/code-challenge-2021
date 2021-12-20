import { expect } from "expect";
import { TermAnalysis } from "../models/TermAnalysis.ts";
import { TermAnalysisParser } from "./TermAnalysisParser.ts";

Deno.test("that parses assignments", () => {
  const file = `1\nlove-hate|a=2,e=4,h=3,l=5,o=1,t=6,v=0`;

  const cases = TermAnalysisParser.parseFromFile(file);

  const expectedResult: TermAnalysis[] = [
    {
      terms: ["love", "hate"],
      scores: {
        a: 2,
        e: 4,
        h: 3,
        l: 5,
        o: 1,
        t: 6,
        v: 0,
      },
    },
  ];
  expect(cases).toEqual(expectedResult);
});

Deno.test("that parses tuples", () => {
  const file =
    `1\nlow-high|[('g', 1/3), ('h', 2), ('i', 1/9), ('l', 4), ('o', 0), ('w', 1/8)]`;

  const cases = TermAnalysisParser.parseFromFile(file);

  const expectedResult: TermAnalysis[] = [
    {
      terms: ["low", "high"],
      scores: {
        g: 1 / 3,
        h: 2,
        i: 1 / 9,
        l: 4,
        o: 0,
        w: 1 / 8,
      },
    },
  ];
  expect(cases).toEqual(expectedResult);
});

Deno.test("that parses dictionaries", () => {
  const file =
    `1\nlose-find|{'d': 3, 'e': 0, 'f': 5, 'i': 2, 'l': 1, 'n': 4, 'o': 7, 's': 6}`;

  const cases = TermAnalysisParser.parseFromFile(file);

  const expectedResult: TermAnalysis[] = [
    {
      terms: ["lose", "find"],
      scores: {
        d: 3,
        e: 0,
        f: 5,
        i: 2,
        l: 1,
        n: 4,
        o: 7,
        s: 6,
      },
    },
  ];
  expect(cases).toEqual(expectedResult);
});

Deno.test("that parses the given example", () => {
  const file = `10
love-hate|a=2,e=4,h=3,l=5,o=1,t=6,v=0
low-high|[('g', 1/3), ('h', 2), ('i', 1/9), ('l', 4), ('o', 0), ('w', 1/8)]
clever-stupid|c=6/9,d=5/6,e=8/9,i=1/7,l=0,p=8/10,r=5/10,s=6/9,t=5/6,u=4/10,v=3/8
lose-find|{'d': 3, 'e': 0, 'f': 5, 'i': 2, 'l': 1, 'n': 4, 'o': 7, 's': 6}
win-lose|e=1,i=4,l=2,n=0,o=6,s=3,w=5
blame-praise|[('a', 5), ('b', 8), ('e', 4), ('i', 2), ('l', 0), ('m', 1), ('p', 3), ('r', 6), ('s', 7)]
false-true|{'a': 7/9, 'e': 2/5, 'f': 3, 'l': 0, 'r': 7, 's': 2, 't': 5, 'u': 1/5}
soft-hard|a=0,d=1,f=4,h=7,o=2,r=5,s=6,t=3
rough-smooth|g=7/10,h=7/9,m=3,o=4,r=6,s=1,t=4/5,u=3/10
tame-wild|{'a': 1, 'd': 5, 'e': 3, 'i': 0, 'l': 2, 'm': 4, 't': 7, 'w': 6}`;

  const cases = TermAnalysisParser.parseFromFile(file);

  const expectedResult: TermAnalysis[] = [
    {
      terms: ["love", "hate"],
      scores: {
        a: 2,
        e: 4,
        h: 3,
        l: 5,
        o: 1,
        t: 6,
        v: 0,
      },
    },
    {
      terms: ["low", "high"],
      scores: {
        g: 1 / 3,
        h: 2,
        i: 1 / 9,
        l: 4,
        o: 0,
        w: 1 / 8,
      },
    },
    {
      terms: ["clever", "stupid"],
      scores: {
        c: 6 / 9,
        d: 5 / 6,
        e: 8 / 9,
        i: 1 / 7,
        l: 0,
        p: 8 / 10,
        r: 5 / 10,
        s: 6 / 9,
        t: 5 / 6,
        u: 4 / 10,
        v: 3 / 8,
      },
    },
    {
      terms: ["lose", "find"],
      scores: {
        d: 3,
        e: 0,
        f: 5,
        i: 2,
        l: 1,
        n: 4,
        o: 7,
        s: 6,
      },
    },
    {
      terms: ["win", "lose"],
      scores: {
        e: 1,
        i: 4,
        l: 2,
        n: 0,
        o: 6,
        s: 3,
        w: 5,
      },
    },
    {
      terms: ["blame", "praise"],
      scores: {
        a: 5,
        b: 8,
        e: 4,
        i: 2,
        l: 0,
        m: 1,
        p: 3,
        r: 6,
        s: 7,
      },
    },
    {
      terms: ["false", "true"],
      scores: {
        a: 7 / 9,
        e: 2 / 5,
        f: 3,
        l: 0,
        r: 7,
        s: 2,
        t: 5,
        u: 1 / 5,
      },
    },
    {
      terms: ["soft", "hard"],
      scores: {
        a: 0,
        d: 1,
        f: 4,
        h: 7,
        o: 2,
        r: 5,
        s: 6,
        t: 3,
      },
    },
    {
      terms: ["rough", "smooth"],
      scores: {
        g: 7 / 10,
        h: 7 / 9,
        m: 3,
        o: 4,
        r: 6,
        s: 1,
        t: 4 / 5,
        u: 3 / 10,
      },
    },
    {
      terms: ["tame", "wild"],
      scores: {
        a: 1,
        d: 5,
        e: 3,
        i: 0,
        l: 2,
        m: 4,
        t: 7,
        w: 6,
      },
    },
  ];
  expect(cases).toEqual(expectedResult);
});

Deno.test("that parses ending newlines", () => {
  const file = `1\nlove-hate|a=2,e=4,h=3,l=5,o=1,t=6,v=0\n`;

  const cases = TermAnalysisParser.parseFromFile(file);

  const expectedResult: TermAnalysis[] = [
    {
      terms: ["love", "hate"],
      scores: {
        a: 2,
        e: 4,
        h: 3,
        l: 5,
        o: 1,
        t: 6,
        v: 0,
      },
    },
  ];
  expect(cases).toEqual(expectedResult);
});
