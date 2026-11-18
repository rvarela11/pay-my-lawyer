import { describe, expect, it } from 'vitest';
import { formatPhone } from './formatPhone.ts';

describe('formatPhone', () => {
  it.each([
    ['555', '(555'],
    ['5551', '(555) 1'],
    ['5551234567', '(555) 123-4567'],
    ['+1 (555) 123-4567', '(555) 123-4567'],
    ['15551234567', '(555) 123-4567'],
    ['555123456789', '(555) 123-4567'],
    ['', ''],
  ])('formats %s as %s', (input, expected) => {
    expect(formatPhone(input)).toBe(expected);
  });
});
