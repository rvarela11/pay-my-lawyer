import responses from './responses.json';
import type { CreateAccountValues } from './validation.ts';

export type CreateAccountResponse = {
  body: string;
  status: number;
};

const DELAY_MS = 800;

export const submitCreateAccount = async (
  values: CreateAccountValues,
): Promise<CreateAccountResponse> => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  switch (values.email.toLowerCase()) {
    case 'duplicate@example.com':
      return responses.duplicate;
    case 'error@example.com':
      return responses.serverError;
    default:
      return responses.success;
  }
};
