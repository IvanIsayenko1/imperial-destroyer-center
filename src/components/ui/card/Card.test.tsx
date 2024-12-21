import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

describe('Card', () => {
  const mockProps = {
    imageSrc: '/test-image.jpg',
    name: 'Test Card',
    properties: {
      type: 'Test Type',
      status: 'Active',
    },
  };

  it('renders the card with all provided props', () => {
    render(<Card {...mockProps} />);

    // Check if image is rendered with correct src and alt
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Card');

    // Check if name is rendered
    expect(screen.getByText('Test Card')).toBeInTheDocument();

    // Check if properties are rendered
    expect(screen.getByText('type: Test Type')).toBeInTheDocument();
    expect(screen.getByText('status: Active')).toBeInTheDocument();
  });

  it('renders multiple properties correctly', () => {
    const propsWithManyProperties = {
      ...mockProps,
      properties: {
        prop1: 'Value 1',
        prop2: 'Value 2',
        prop3: 'Value 3',
      },
    };

    render(<Card {...propsWithManyProperties} />);

    expect(screen.getByText('prop1: Value 1')).toBeInTheDocument();
    expect(screen.getByText('prop2: Value 2')).toBeInTheDocument();
    expect(screen.getByText('prop3: Value 3')).toBeInTheDocument();
  });

  it('renders with minimum properties', () => {
    const minimalProps = {
      ...mockProps,
      properties: {},
    };

    render(<Card {...minimalProps} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.queryByText(/:/)).not.toBeInTheDocument();
  });
});
