import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../../../components/core/SearchBox';

describe('SearchBox', () => {
    it('renders with correct placeholder and value', () => {
        const onChangeMock = jest.fn();
        render(
            <SearchBox
                value="test search"
                onChange={onChangeMock}
                placeholder="Search here..."
            />
        );

        const inputEl = screen.getByPlaceholderText('Search here...') as HTMLInputElement;
        expect(inputEl).toBeInTheDocument();
        expect(inputEl.value).toBe('test search');
    });

    it('calls onChange with the new value when typed', () => {
        const onChangeMock = jest.fn();
        render(
            <SearchBox
                value=""
                onChange={onChangeMock}
                placeholder="Search..."
            />
        );

        const inputEl = screen.getByPlaceholderText('Search...');
        fireEvent.change(inputEl, { target: { value: 'pizza' } });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith('pizza');
    });
});
