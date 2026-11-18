import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';
import { ownerSchema } from '../OwnerDialog/validation.ts';
import { type Applicant, toOwnerRows, totalOwnership } from './ownerRows.ts';

const APPLICANT: Applicant = {
  barNumber: '12345',
  dateOfBirth: dayjs('1985-04-28'),
  firstName: 'Ana',
  jobTitle: 'Owner',
  lastName: 'Ng',
  ownership: '60',
};

const BEN = {
  ...ownerSchema.getDefault(),
  dateOfBirth: dayjs('1979-02-03'),
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

  it('formats dates and shows a dash for a blank Bar Card number', () => {
    const [applicant, ben] = toOwnerRows(APPLICANT, [BEN]);

    expect(applicant).toMatchObject({
      barNumber: '12345',
      dateOfBirth: '04/28/1985',
      ownership: 60,
      title: 'Owner',
    });
    expect(ben).toMatchObject({
      barNumber: '—',
      dateOfBirth: '02/03/1979',
      ownership: 30,
      title: 'Partner',
    });
  });

  it('leaves a missing date blank', () => {
    const [applicant] = toOwnerRows({ ...APPLICANT, dateOfBirth: null }, []);

    expect(applicant.dateOfBirth).toBe('');
  });
});

describe('totalOwnership', () => {
  it('adds the applicant and every owner', () => {
    expect(totalOwnership(toOwnerRows(APPLICANT, [BEN]))).toBe(90);
  });
});
