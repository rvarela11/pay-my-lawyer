import { describe, expect, it } from 'vitest';
import { formatEin } from './formatEin.ts';

describe('formatEin', () => {
  it.each([
    ['12', '12'],
    ['123', '12-3'],
    ['12-3456789', '12-3456789'],
    ['1234567890', '12-3456789'],
    ['', ''],
  ])('formats %s as %s', (input, expected) => {
    expect(formatEin(input)).toBe(expected);
  });
});
