/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../components/Header';

describe('Header', () => {
  it('should be able to type in url field in form', () => {
    render(<Header />);

    const inputElement = screen.getByPlaceholderText(
      'e.g. https://icheckmovies.com/lists/imdbs+top+250/'
    );
    fireEvent.change(inputElement, {
      target: {
        value:
          'https://www.icheckmovies.com/lists/woody+allen+filmography/fritz/',
      },
    });
    expect(inputElement.value).toBe(
      'https://www.icheckmovies.com/lists/woody+allen+filmography/fritz/'
    );
  });

  it('should be able to select region in form', () => {
    render(<Header />);

    const selectElement = screen.getByRole('combobox');
    userEvent.selectOptions(selectElement, 'gb');

    const optionElementGB = screen.getByRole('option', { name: 'GB' });
    const optionElementUS = screen.getByRole('option', { name: 'US' });

    expect(optionElementGB.selected).toBe(true);
    expect(optionElementUS.selected).toBe(false);
  });
});
