import { describe, expect, it } from 'vitest';
import { normalizeWebsite } from './normalizeWebsite.ts';

describe('normalizeWebsite', () => {
  it.each([
    ['yourfirm.com', 'https://yourfirm.com'],
    [' yourfirm.com ', 'https://yourfirm.com'],
    ['http://yourfirm.com', 'http://yourfirm.com'],
    ['https://yourfirm.com', 'https://yourfirm.com'],
    ['', ''],
  ])('normalizes %s as %s', (input, expected) => {
    expect(normalizeWebsite(input)).toBe(expected);
  });
});
