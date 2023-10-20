import { useState } from 'react';
import {
    SearchBarHeader,
    SearchButton,
    SearchForm,
    SearchInput,
} from './SearchBar.styled';

const Searchbar = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const addInputData = e => {
        e.preventDefault();
        onSubmit(value.toLowerCase().trim());
    };

    const getInputData = ({ target: { value } }) => {
        setValue(value);
    };

    return (
        <SearchBarHeader>
            <SearchForm onSubmit={addInputData}>
                <SearchButton type="submit"></SearchButton>
                <SearchInput
                    name="searchQuery"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={getInputData}
                />
            </SearchForm>
        </SearchBarHeader>
    );
};

export default Searchbar;