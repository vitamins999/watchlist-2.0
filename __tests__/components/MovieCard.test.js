/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import MovieCard from '../../components/MovieCard';

const mockMovieData = {
  listNumber: 10,
  id: '550',
  title: 'Fight Club',
  year: '1999',
  imagePath: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
  providerDetails: [
    {
      providerName: 'Amazon Prime Video',
      providerLogoPath: '/68MNrwlkpF7WnmNPXLah69CR5cb.jpg',
    },
    {
      providerName: 'Netflix',
      providerLogoPath: '/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg',
    },
  ],
};

const mockMovieDataLongTitle = {
  listNumber: 11,
  id: '18491',
  title: 'Neon Genesis Evangelion: The End of Evangelion',
  year: '1997',
  imagePath: '/m9PTii0XWCIKZBBrCrOn8RLTK0w.jpg',
  providerDetails: [
    {
      providerName: 'Netflix',
      providerLogoPath: '/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg',
    },
  ],
};

describe('Movie Card', () => {
  it('should render title', () => {
    render(<MovieCard movie={mockMovieData} />);
    const headingElement = screen.getByTestId('movie-title');
    expect(headingElement.textContent).toBe('Fight Club');
  });

  it('should render year', () => {
    render(<MovieCard movie={mockMovieData} />);
    const headingElement = screen.getByTestId('movie-year');
    expect(headingElement.textContent).toBe('1999');
  });

  it('should render 2 streaming providers', () => {
    render(<MovieCard movie={mockMovieData} />);
    const divElements = screen.getAllByTestId('div-streaming-provider');
    expect(divElements.length).toBe(2);
  });

  it('should render first streaming provider correctly', () => {
    render(<MovieCard movie={mockMovieData} />);
    const imageElements = screen.getAllByTestId('image-streaming-provider');
    expect(imageElements[0].alt).toBe('Amazon Prime Video');
  });

  it('should render second streaming provider correctly', () => {
    render(<MovieCard movie={mockMovieData} />);
    const imageElements = screen.getAllByTestId('image-streaming-provider');
    expect(imageElements[1].alt).toBe('Netflix');
  });

  it('should show divider on titles 40 characters or less', () => {
    render(<MovieCard movie={mockMovieData} />);
    const divElement = screen.getByTestId('divider');
    expect(divElement).not.toHaveClass('hidden');
  });

  it('should hide divider on titles more than 40 characters', () => {
    render(<MovieCard movie={mockMovieDataLongTitle} />);
    const divElement = screen.getByTestId('divider');
    expect(divElement).toHaveClass('hidden');
  });
});
