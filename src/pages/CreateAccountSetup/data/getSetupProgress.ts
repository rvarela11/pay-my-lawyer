import type { FieldName } from '../fields.ts';
import responses from './responses.json';

export const DELAY_MS = 800;

// A stand-in for the API's request status until #43 confirms its shape.
export type SetupProgress =
  | { status: 'none' }
  | {
      furthest: string;
      provider: string;
      status: 'draft';
      values: Partial<Record<FieldName, string>>;
    }
  | { provider: string; status: 'submitted' };

export const getSetupProgress = async (): Promise<SetupProgress> => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  return responses.none as SetupProgress;
};
