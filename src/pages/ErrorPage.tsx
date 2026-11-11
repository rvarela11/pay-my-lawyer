import { isRouteErrorResponse, useRouteError } from 'react-router';

export const ErrorPage = () => {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return (
    <section>
      <h1>Something went wrong</h1>
      <p>{message}</p>
    </section>
  );
};
