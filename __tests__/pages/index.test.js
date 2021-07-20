/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '../../pages/index';

const openModal = () => {
  const buttonElement = screen.getByRole('button', { name: /Search Now!/i });
  fireEvent.click(buttonElement);
};

describe('Home Page', () => {
  it('should render modal on button click', () => {
    render(<HomePage />);
    openModal();

    const divElement = screen.getByTestId('modal');
    expect(divElement).toBeInTheDocument();
  });

  it('should be able to type in url field in form', () => {
    render(<HomePage />);
    openModal();

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
    render(<HomePage />);
    openModal();

    const selectElement = screen.getByRole('combobox');
    userEvent.selectOptions(selectElement, 'gb');

    const optionElementGB = screen.getByRole('option', { name: 'GB' });
    const optionElementUS = screen.getByRole('option', { name: 'US' });

    expect(optionElementGB.selected).toBe(true);
    expect(optionElementUS.selected).toBe(false);
  });
});
