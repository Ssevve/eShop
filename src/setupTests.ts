/* eslint-disable import/no-extraneous-dependencies */
import matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import server from 'mocks/api/server';

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

expect.extend(matchers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
