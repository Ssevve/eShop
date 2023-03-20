import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App', () => {
  it('Renders h1 with Hello text', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /hello!/i
    );
  });
});
