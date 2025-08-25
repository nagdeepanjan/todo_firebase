import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App', () => {
    it('renders the headline', () => {
        render(<App />);
        const headline = screen.getByText(/Todo App/i);
        expect(headline).toBeInTheDocument();
    });
});
