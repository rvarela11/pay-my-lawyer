import type { Dayjs } from 'dayjs';
import type { Owner } from '../OwnerDialog/validation.ts';

// The applicant's own row, read from About you.
export type Applicant = {
  barNumber: string;
  dateOfBirth: Dayjs | null | undefined;
  firstName: string;
  jobTitle: string;
  lastName: string;
  ownership: string;
};

// One row of the owners list, ready to show. `owner` is null for the applicant.
export type OwnerRow = {
  barNumber: string;
  dateOfBirth: string;
  id: string;
  name: string;
  owner: Owner | null;
  ownership: number;
  title: string;
};

// Shown for a blank Bar Card number.
const DASH = '—';

const formatDate = (date: Dayjs | null | undefined) =>
  date?.format('MM/DD/YYYY') ?? '';

export const fullName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`.trim();

// The applicant first, then each owner.
export const toOwnerRows = (
  applicant: Applicant,
  owners: Owner[],
): OwnerRow[] => [
  {
    barNumber: applicant.barNumber || DASH,
    dateOfBirth: formatDate(applicant.dateOfBirth),
    id: 'you',
    name: fullName(applicant.firstName, applicant.lastName),
    owner: null,
    ownership: Number(applicant.ownership),
    title: applicant.jobTitle,
  },
  ...owners.map((owner) => ({
    barNumber: owner.barNumber || DASH,
    dateOfBirth: formatDate(owner.dateOfBirth),
    id: owner.id,
    name: fullName(owner.firstName, owner.lastName),
    owner,
    ownership: Number(owner.ownership),
    title: owner.jobTitle,
  })),
];

export const totalOwnership = (rows: OwnerRow[]) =>
  rows.reduce((sum, row) => sum + row.ownership, 0);
