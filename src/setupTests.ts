// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

import dotenv from 'dotenv';
dotenv.config({ path: './jest.env' });

/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addListener: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeListener: () => {},
    };
  };
