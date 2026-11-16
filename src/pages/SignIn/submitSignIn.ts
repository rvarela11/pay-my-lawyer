import responses from './responses.json';
import type { SignInValues } from './validation.ts';

export type SignInResponse = {
  body: string;
  status: number;
  subdomain: string;
};

export const DELAY_MS = 800;

const getLoginResponse = (email: string) => {
  switch (email.toLowerCase()) {
    case 'wrong@example.com':
      return responses.login.wrong;
    case 'error@example.com':
      return responses.login.serverError;
    default:
      return responses.login.success;
  }
};

export const submitSignIn = async (
  values: SignInValues,
): Promise<SignInResponse> => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  return {
    ...getLoginResponse(values.email),
    subdomain: responses.domain.body,
  };
};
