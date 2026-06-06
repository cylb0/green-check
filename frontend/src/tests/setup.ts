import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import { expect as vitestExpect } from 'vitest';

vitestExpect.extend(matchers);

afterEach(() => {
  cleanup();
});