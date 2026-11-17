import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach } from 'vitest';

// CI runners render MUI far slower than a laptop; the 1s default made findBy/waitFor time out there.
configure({ asyncUtilTimeout: 5000 });

afterEach(() => {
  cleanup();
});
