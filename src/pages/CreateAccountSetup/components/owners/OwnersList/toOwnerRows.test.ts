import { describe, expect, it } from 'vitest';
import { ownerSchema } from '../OwnerDialog/validation.ts';
import { type Applicant, toOwnerRows, totalOwnership } from './toOwnerRows.ts';

const APPLICANT: Applicant = {
  barNumber: '12345',
  firstName: 'Ana',
  jobTitle: 'Owner',
  lastName: 'Ng',
  ownership: '60',
};

const BEN = {
  ...ownerSchema.getDefault(),
  firstName: 'Ben',
  id: 'ben',
  jobTitle: 'Partner',
  lastName: 'Ortiz',
  ownership: '30',
};

describe('toOwnerRows', () => {
  it('lists the applicant first, then each owner', () => {
    const rows = toOwnerRows(APPLICANT, [BEN]);

    expect(rows.map(({ id, name, owner }) => [id, name, owner])).toEqual([
      ['you', 'Ana Ng', null],
      ['ben', 'Ben Ortiz', BEN],
    ]);
  });

  it('shows a dash for a blank Bar Card number', () => {
    const [applicant, ben] = toOwnerRows(APPLICANT, [BEN]);

    expect(applicant).toMatchObject({
      barNumber: '12345',
      ownership: 60,
      title: 'Owner',
    });
    expect(ben).toMatchObject({
      barNumber: '—',
      ownership: 30,
      title: 'Partner',
    });
  });
});

describe('totalOwnership', () => {
  it('adds the applicant and every owner', () => {
    expect(totalOwnership(toOwnerRows(APPLICANT, [BEN]))).toBe(90);
  });
});
