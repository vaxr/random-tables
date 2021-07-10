import { TableBuilder } from './index';

describe('TableBuilder', () => {
  interface TestCase {
    name: string;
    input: {
      entry: any;
      weight: number;
    }[];
    expectedByRoll: {
      roll: number;
      expected: any;
    }[];
    errorByRoll: {
      roll: number;
      error: any;
    }[];
  }

  [
    {
      name: 'default case',
      input: [
        { entry: 'a', weight: 10 },
        { entry: 'b', weight: 10 },
        { entry: 'c', weight: 80 },
      ],
      expectedByRoll: [
        { roll: 0, expected: 'c' },
        { roll: 0.799, expected: 'c' },
        { roll: 0.801, expected: 'a' },
        { roll: 0.899, expected: 'a' },
        { roll: 0.901, expected: 'b' },
        { roll: 0.999, expected: 'b' },
      ],
      errorByRoll: [
        {
          roll: -0.001,
          error: TypeError,
        },
        {
          roll: 1,
          error: TypeError,
        },
      ],
    },
  ].forEach((tc: TestCase) => {
    describe(tc.name, () => {
      const builder = new TableBuilder();
      for (const row of tc.input) {
        builder.addEntryWithWeight(row.entry, row.weight);
      }
      const table = builder.build();
      for (const row of tc.expectedByRoll) {
        it(`${row.roll} --> ${row.expected}`, () => {
          const got = table.getEntryForRoll(row.roll);
          expect(got).toBe(row.expected);
        });
      }
      for (const row of tc.errorByRoll) {
        it(`${row.roll} trows ${row.error}`, () => {
          const call = () => table.getEntryForRoll(row.roll);
          expect(call).toThrow(row.error);
        });
      }
    });
  });
});
